import { IAddress } from "../../../domain/interface/IAddress";

export interface IAssociationDTO {
    id?: string
    name: string
    description: string
    address: IAddress
    numRNA: string
    siret: string
    verified: boolean
    greenCoins: number
    loginId: string
    password: string
    token?: string
}