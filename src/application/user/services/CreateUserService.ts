import { User } from "../../../domain/entity/User";
import { Guard } from "../../commons/Guard";
import { IUserDTO } from "../dto/IUserDTO";
import { UserMap } from "../mappers/UserMap";
import bcrypt from "bcryptjs"

export class CreateUserService {
    public static async create(userInfo: IUserDTO): Promise<User> {
        Guard.AgainstNullOrUndefined(userInfo.firstName, "first name")
        Guard.AgainstNullOrUndefined(userInfo.lastName, "last name")
        Guard.AgainstNullOrUndefined(userInfo.email, "email")
        Guard.AgainstInvalidEmail(userInfo.email, "email")
        Guard.AgainstNullOrUndefined(userInfo.address, "address")
        Guard.AgainstNullOrUndefined(userInfo.password, "password")

        userInfo.greenCoins = {amount: 0, expireDate: Date.now()}
        if( this.isMarchand(userInfo.siren, userInfo.siret)) {
            userInfo.marchand = true
        }

        const hash = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(userInfo.password, hash);
        userInfo.password = hashPassword

        let newUser = UserMap.toDomain(userInfo)
        
        return newUser
    }

    private static isMarchand(siren?: string, siret?: string): boolean {
        if ((siren! != null || siren! != undefined) || (siret! != null || siren! != undefined)) {
            return true
        }
        return false
    }
}