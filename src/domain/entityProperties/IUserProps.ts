import { IAddress } from "./IAddress";
import { IGreenCoins } from "./IGreenCoins"
import { IProductSold } from "./IProductSold";
import { IShippingLabel } from "./IShippingLabel";
import { IUserOrders } from "./IUserOrders";

export interface IUserProps {
    firstName: string
    lastName: string
    email: string
    password: string
    address: IAddress
    greenCoins: IGreenCoins
    merchant: boolean
    stripeCustomerId?: string
    stripeAccountId?: string
    orders: IUserOrders[]
    productSold?: IProductSold[]
    token?: string
    siret?: string
    siren?: string
    creationDate: Date
}