import { IAddress } from "../../domain/entityProperties/IAddress";
import { IGreenCoins } from "../../domain/entityProperties/IGreenCoins";
import { IProductSold } from "../../domain/entityProperties/IProductSold";
import { IUserAchat } from "../../domain/entityProperties/IUserAchat";

export interface IUserDTO {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    greenCoins: IGreenCoins
    merchant: boolean
    achats: IUserAchat[]
    productSold?: IProductSold[]
    token?: string
    address: IAddress
    siret?: string
    siren?: string
    creationDate: Date
}