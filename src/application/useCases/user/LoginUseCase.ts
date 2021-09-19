import { InvalidCredentialsError } from "../../errors/InvalidCredentialsError";
import { ILoginUseCase } from "./ILoginUseCase";
import { UserMap } from "../../mappers/UserMap";
import { IPasswordHandler } from "../../interfaces/services/IPasswordHandler";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IJwtHandler } from "../../interfaces/services/IJwtHandler";
import config from "../../../../config";
import { IGreenRepackRepository } from "../../interfaces/repository/IGreenRepackRepository";
import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";
import { GreenRepackMap } from "../../mappers/GreenRepackMap";
import { AssociationMap } from "../../mappers/AssociationMap";

export class LoginUseCase  implements ILoginUseCase {
    async execute(credentials: any, passwordHandler: IPasswordHandler, jwtHandler: IJwtHandler, userRepository: IUserRepository,
        greenRepRepository: IGreenRepackRepository, assoRepository: IAssociationRepository): Promise<string> {
        let user = await userRepository.getUserByEmail(credentials.login)
        let greenRepMember = await greenRepRepository.getMemberByUsername(credentials.login)
        let association = await assoRepository.getAssociationByEmail(credentials.login)
        if (user != undefined) {
            let passwordVerification = await passwordHandler.checkPassword(user.password, credentials.password)
            if(!passwordVerification) throw new InvalidCredentialsError()

            let userToken = await jwtHandler.generateToken(config.TOKEN_EXPIRATION, user.id)
            
            let userDTO = UserMap.toDTO(user)
            userDTO.token = userToken
            
            await userRepository.save(UserMap.toDomain(userDTO))
            return userToken
        } else if (greenRepMember != undefined) {
            let passwordVerification = await passwordHandler.checkPassword(greenRepMember.password, credentials.password)
            if(!passwordVerification) throw new InvalidCredentialsError()

            let greenRepToken = await jwtHandler.generateToken(config.TOKEN_EXPIRATION, greenRepMember.id)
            
            let greenRepDTO = GreenRepackMap.toDTO(greenRepMember)
            greenRepDTO.token = greenRepToken
            
            await greenRepRepository.save(GreenRepackMap.toDomain(greenRepDTO))
            return greenRepToken
        } else if (association != undefined) {
            let passwordVerification = await passwordHandler.checkPassword(association.password, credentials.password)
            if(!passwordVerification) throw new InvalidCredentialsError()

            let associationToken = await jwtHandler.generateToken(config.TOKEN_EXPIRATION, association.id)
            
            let associationDTO = AssociationMap.toDTO(association)
            associationDTO.token = associationToken
            
            await assoRepository.save(AssociationMap.toDomain(associationDTO))
            return associationToken
        } else {
            throw new InvalidCredentialsError()
        }
    }

}