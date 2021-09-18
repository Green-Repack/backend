import { IRegisterUseCase } from "./IRegisterUseCase";
import { Guard } from "../../commons/Guard";
import { UserAlreadyExistsError } from "../../errors/UserAlreadyExistsError";
import { IPasswordHandler } from "../../interfaces/services/IPasswordHandler";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { UserMap } from "../../mappers/UserMap";

export class RegisterUseCase  implements IRegisterUseCase {
    public async execute(userInfo: any, passwordHandler: IPasswordHandler, repository: IUserRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(userInfo.firstName, "first name required")
            Guard.AgainstNullOrUndefined(userInfo.lastName, "last name required")
            Guard.AgainstNullOrUndefined(userInfo.email, "email required")
            Guard.AgainstInvalidEmail(userInfo.email, "invalid email")
            Guard.AgainstNullOrUndefined(userInfo.address, "address required")
            Guard.AgainstNullOrUndefined(userInfo.password, "password required")

            userInfo.greenCoins = {amount: 0, expireDate: new Date()}
            
            userInfo.marchand = this.isMarchand(userInfo.siren, userInfo.siret)
            userInfo.creationDate = new Date()

            userInfo.password = passwordHandler.generatePasswordHash(userInfo.passwrd)
        
            let userExists = await repository.exists(userInfo.email);

            if (userExists) throw new UserAlreadyExistsError()

            let newUser = UserMap.toDomain(userInfo)
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