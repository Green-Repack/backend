import { IAddress } from "./IAddress";
import { IProjectAssociation } from "./IProjectAssociation";

export interface IAssociationProps {
    name: string
    description?: string
    address: IAddress
    numRNA?: string
    siret?: string
    verified: boolean
    email: string
    password: string
    projects: IProjectAssociation[]
    token?: string
    creationDate: Date
}