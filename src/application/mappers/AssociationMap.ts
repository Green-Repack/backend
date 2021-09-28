import { Association } from "../../domain/entity/Association"
import { IAssociationDTO } from "../DTOs/IAssociationDTO"

export class AssociationMap {
    public static toDTO(association: Association): IAssociationDTO {
        return {
            id: association.id,
            name: association.name,
            description: association.description,
            address: association.address,
            numRNA: association.numRNA,
            siret: association.siret,
            verified: association.isVerified(),
            email: association.email,
            password: association.password,
            projects: association.projects,
            stripeCustomerId: association.stripeCustomerId, 
            token: association.token,
            creationDate: association.creationDate
        }
    }

    public static toDomain(association: any): Association {
        return Association.createAssociation({
            name: association.name,
            description: association.description,
            address: association.address,
            numRNA: association.numRNA,
            siret: association.siret,
            verified: association.verified,
            email: association.email,
            password: association.password,
            projects: association.projects,
            stripeCustomerId: association.stripeCustomerId, 
            token: association.token,
            creationDate: association.creationDate
        }, association.id)
    }

    public static toPersistence(association: Association): any {
        return {
            id: association.id,
            name: association.name,
            description: association.description,
            address: association.address,
            numRNA: association.numRNA,
            siret: association.siret,
            verified: association.isVerified(),
            email: association.email,
            password: association.password,
            projects: association.projects, 
            stripeCustomerId: association.stripeCustomerId, 
            token: association.token,
            creationDate: association.creationDate
        }
    }
}