import { IAddress } from "./IAddress";
import { IGreenCoins } from "./IGreenCoins"
import { IProductSold } from "./IProductSold";
import { IUserAchat } from "./IUserAchat";

export interface IUserProps {
    firstName: string
    lastName: string
    email: string
    password: string
    address: IAddress
    greenCoins: IGreenCoins
    marchand: boolean
    achats: IUserAchat[]
    productSold?: IProductSold[]
    token?: string
    siret?: string
    siren?: string
    creationDate: Date
}