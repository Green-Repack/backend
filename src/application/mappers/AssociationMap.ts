import { Assocation } from "../../domain/entity/Association"
import { IAssociationDTO } from "../DTOs/IAssociationDTO"

export class AssociationMap {
    public static toDTO(association: Assocation): IAssociationDTO {
        return {
            id: association.id,
            name: association.name,
            description: association.description,
            address: association.address,
            numRNA: association.numRNA,
            siret: association.siret,
            greenCoins: association.greenCoins,
            verified: association.isVerified(),
            loginId: association.loginId,
            password: association.password,
            token: association.token
        }
    }

    public static toDomain(association: any): Assocation {
        return Assocation.createAssociation({
            name: association.name,
            description: association.description,
            address: association.address,
            numRNA: association.numRNA,
            siret: association.siret,
            greenCoins: association.greenCoins,
            verified: association.verified,
            loginId: association.loginId,
            password: association.password,
            token: association.token 
        }, association.id)
    }

    public static toPersistence(association: Assocation): any {
        return {
            id: association.id,
            name: association.name,
            description: association.description,
            address: association.address,
            numRNA: association.numRNA,
            siret: association.siret,
            greenCoins: association.greenCoins,
            verified: association.isVerified(),
            loginId: association.loginId,
            password: association.password,
            token: association.token
        }
    }
}