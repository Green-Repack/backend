import { IAddress } from "./IAddress";
import { IGreenCoins } from "./IGreenCoins"
import { IProductSold } from "./IProductSold";
import { IUserOrders } from "./IUserOrders";

export interface IUserProps {
    firstName: string
    lastName: string
    email: string
    password: string
    address: IAddress
    greenCoins: IGreenCoins
    merchant: boolean
    orders: IUserOrders[]
    productSold?: IProductSold[]
    token?: string
    siret?: string
    siren?: string
    creationDate: Date
}