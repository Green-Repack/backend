import { User } from "../../../domain/entity/User";
import { Guard } from "../../commons/Guard";
import bcrypt from "bcryptjs"
import {IUserDTO} from "../../DTOs/IUserDTO";
import {UserMap} from "../../mappers/UserMap";

export class CreateUserService {
    public static async create(userInfo: IUserDTO): Promise<User> {
        Guard.AgainstNullOrUndefined(userInfo.firstName, "first name required")
        Guard.AgainstNullOrUndefined(userInfo.lastName, "last name required")
        Guard.AgainstNullOrUndefined(userInfo.email, "email required")
        Guard.AgainstInvalidEmail(userInfo.email, "invalid email")
        Guard.AgainstNullOrUndefined(userInfo.address, "address required")
        Guard.AgainstNullOrUndefined(userInfo.password, "password required")

        let expireYear : number = (new Date()).getFullYear()+1

        userInfo.greenCoins = {amount: 0, expireDate: new Date(expireYear, 1)}
        
        userInfo.merchant = this.isMerchant(userInfo.siren, userInfo.siret)

        const hash = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(userInfo.password, hash);
        userInfo.password = hashPassword

        let newUser = UserMap.toDomain(userInfo)
        
        return newUser
    }

    private static isMerchant(siren?: string, siret?: string): boolean {
        if ((siren! != null || siren! != undefined) || (siret! != null || siren! != undefined)) {
            return true
        }
        return false
    }
}