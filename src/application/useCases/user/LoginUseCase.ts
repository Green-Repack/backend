import { InvalidCredentialsError } from "../../errors/InvalidCredentialsError";
import { ILoginUseCase } from "./ILoginUseCase";
import { UserMap } from "../../mappers/UserMap";
import { IPasswordHandler } from "../../interfaces/services/IPasswordHandler";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IJwtHandler } from "../../interfaces/services/IJwtHandler";
import { IGreenRepackRepository } from "../../interfaces/repository/IGreenRepackRepository";
import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";
import { GreenRepackMap } from "../../mappers/GreenRepackMap";
import { AssociationMap } from "../../mappers/AssociationMap";

export class LoginUseCase  implements ILoginUseCase {
    async execute(credentials: any, passwordHandler: IPasswordHandler, jwtHandler: IJwtHandler, userRepository: IUserRepository,
        greenRepRepository: IGreenRepackRepository, assoRepository: IAssociationRepository): Promise<{[name: string]: string}> {
        try {
            let user = await userRepository.getUserByEmail(credentials.login)
            let greenRepMember = await greenRepRepository.getMemberByUsername(credentials.login)
            let association = await assoRepository.getAssociationByEmail(credentials.login)

            let currentDate = new Date()
            if (user != undefined) {
                let passwordVerification = await passwordHandler.checkPassword(user.password, credentials.password)
                if(!passwordVerification) throw new InvalidCredentialsError()

                let userToken = await jwtHandler.generateToken(user.id)
                
                let userDTO = UserMap.toDTO(user)
                if (userDTO.greenCoins.expireDate != undefined) {
                    if (currentDate.toISOString() === userDTO.greenCoins.expireDate.toISOString()) {
                        userDTO.greenCoins.amount = 0
                    }
                }

                if (userDTO.merchant) await userRepository.updateShippingLabelExpirationStatus(userDTO.email, currentDate, true)
                
                userDTO.token = userToken
                
                await userRepository.save(UserMap.toDomain(userDTO))
                return {token: userToken, type: "user"}
            } else if (greenRepMember != undefined) {
                let passwordVerification = await passwordHandler.checkPassword(greenRepMember.password, credentials.password)
                if(!passwordVerification) throw new InvalidCredentialsError()

                let greenRepToken = await jwtHandler.generateToken(greenRepMember.id)
                
                let greenRepDTO = GreenRepackMap.toDTO(greenRepMember)
                greenRepDTO.token = greenRepToken
                
                await greenRepRepository.save(GreenRepackMap.toDomain(greenRepDTO))
                return {token: greenRepToken, type: "greenrepack"}
            } else if (association != undefined) {
                let passwordVerification = await passwordHandler.checkPassword(association.password, credentials.password)
                if(!passwordVerification) throw new InvalidCredentialsError()

                let associationToken = await jwtHandler.generateToken(association.id)
                
                let associationDTO = AssociationMap.toDTO(association)
                associationDTO.token = associationToken
                
                await assoRepository.save(AssociationMap.toDomain(associationDTO))
                return {token: associationToken, type: "association"}
            } else {
                throw new InvalidCredentialsError()
            }
        } catch(error) {
            throw error
        }
    }

}