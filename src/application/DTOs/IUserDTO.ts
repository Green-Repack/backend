import { IAddress } from "../../domain/entityProperties/IAddress";
import { IGreenCoins } from "../../domain/entityProperties/IGreenCoins";
import { IProductSold } from "../../domain/entityProperties/IProductSold";
import { IUserOrders } from "../../domain/entityProperties/IUserOrders";

export interface IUserDTO {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    greenCoins: IGreenCoins
    orders: IUserOrders[]
    merchant: boolean
    stripeCustomerId?: string
    productSold?: IProductSold[]
    token?: string
    address: IAddress
    siret?: string
    siren?: string
    creationDate: Date
}