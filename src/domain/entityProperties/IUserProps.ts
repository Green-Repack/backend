import { IAddress } from "./IAddress";
import { IGreenCoins } from "./IGreenCoins"

export interface IUserProps {
    firstName: string
    lastName: string
    email: string
    password: string
    address: IAddress
    greenCoins: IGreenCoins
    marchand: boolean
    token?: string
    siret?: string
    siren?: string
    creationDate: Date
}