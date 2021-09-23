import { IRegisterUseCase } from "./IRegisterUseCase";
import { Guard } from "../../commons/Guard";
import { IPasswordHandler } from "../../interfaces/services/IPasswordHandler";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { UserMap } from "../../mappers/UserMap";
import { AlreadyExistsError } from "../../errors/AlreadyExistsError";
import { IUserDTO } from "../../DTOs/IUserDTO";
import { IUserAchat } from "../../../domain/entityProperties/IUserAchat";
import { IProductSold } from "../../../domain/entityProperties/IProductSold";

export class RegisterUseCase  implements IRegisterUseCase {
    public async execute(userInfo: any, passwordHandler: IPasswordHandler, repository: IUserRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(userInfo.firstName, "first name required")
            Guard.AgainstNullOrUndefined(userInfo.lastName, "last name required")
            Guard.AgainstNullOrUndefined(userInfo.email, "email required")
            Guard.AgainstInvalidEmail(userInfo.email, "invalid email")
            Guard.AgainstNullOrUndefined(userInfo.address, "address required")
            Guard.AgainstNullOrUndefined(userInfo.password, "password required")

            let userDTO: IUserDTO = {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
                address: userInfo.address,
                password: "",
                achats: new Array<IUserAchat>(),
                greenCoins: {amount: 0, expireDate: new Date()},
                marchand: this.isMarchand(userInfo.siren, userInfo.siret),
                creationDate: new Date()
            }

            if (userDTO.marchand) userDTO.productSold = new Array<IProductSold>()

            userDTO.password = await passwordHandler.generatePasswordHash(userInfo.passwrd)
        
            let userExists = await repository.exists(userDTO.email);
            
            if (userExists) throw new AlreadyExistsError("The use already exists")
            
            let newUser = UserMap.toDomain(userDTO)
            await repository.save(newUser)
        } catch(error) {
            throw error
        }
    }

    private isMarchand(siren?: string, siret?: string): boolean {
        if ((siren! != null || siren! != undefined) || (siret! != null || siren! != undefined)) {
            return true
        }
        return false
    }
}