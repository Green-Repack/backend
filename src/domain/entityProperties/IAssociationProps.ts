import { IAddress } from "./IAddress";

export interface IAssociationProps {
    name: string
    description: string
    address: IAddress
    numRNA: string
    siret: string,
    greenCoins: number
    verified: boolean
    loginId: string
    password: string
    token?: string
}