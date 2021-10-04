import { IAddress } from "../../domain/entityProperties/IAddress";
import { IProjectAssociation } from "../../domain/entityProperties/IProjectAssociation";

export interface IAssociationDTO {
    id?: string
    name: string
    description: string
    address: IAddress
    numRNA: string
    siret: string
    verified: boolean
    email: string
    password: string
    stripeCustomerId?: string
    projects: IProjectAssociation[]
    token?: string
    creationDate: Date
}