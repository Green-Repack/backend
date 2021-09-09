import { User } from "../../../domain/entity/User";
import { IUserDTO } from "../dto/IUserDTO";

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
            greenCoins: user.greenCoins,
            merchant: user.isMarchand(),
            siren: user.siren,
            siret: user.siret
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
            greenCoins: user.greenCoins,
            merchant: user.merchant,
            siren: user.siren,
            siret: user.siret
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
            greenCoins: user.greenCoins,
            merchant: user.isMarchand(),
            siren: user.siren,
            siret: user.siret
        }
    }
}