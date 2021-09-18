import { IAddress } from "../../domain/entityProperties/IAddress";
import { IGreenCoins } from "../../domain/entityProperties/IGreenCoins";

export interface IUserDTO {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    greenCoins: IGreenCoins
    marchand: boolean
    token?: string
    address: IAddress
    siret?: string
    siren?: string
    creationDate: Date
}