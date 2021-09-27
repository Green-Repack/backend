import { User } from "../../domain/entity/User";
import { IUserDTO } from "../DTOs/IUserDTO";

export class UserMap {
    public static toDTO(user: User): IUserDTO {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            password: user.password,
            token: user.token,
            orders: user.orders,
            productSold: user.productSold,
            greenCoins: user.greenCoins,
            merchant: user.isMerchant(),
            siren: user.siren,
            siret: user.siret,
            creationDate: user.creationDate
        }
    }

    public static toDomain(user: any): User {
        return User.createUser({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            password: user.password,
            token: user.token,
            orders: user.orders,
            productSold: user.productSold,
            greenCoins: user.greenCoins,
            merchant: user.merchant,
            siren: user.siren,
            siret: user.siret,
            creationDate: user.creationDate
        }, user.id)
    }

    public static toPersistence(user: User): any {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            password: user.password,
            token: user.token,
            orders: user.orders,
            productSold: user.productSold,
            greenCoins: user.greenCoins,
            merchant: user.isMerchant(),
            siren: user.siren,
            siret: user.siret,
            creationDate: user.creationDate
        }
    }
}