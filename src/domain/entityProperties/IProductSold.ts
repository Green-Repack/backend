import { IShippingLabel } from "./IShippingLabel";

export interface IProductSold {
    productId: string
    priceReceived?: number
    sellDate?: Date
    sellStatus: string,
    deliveryFeePaid?: boolean
    shippingLabel?: IShippingLabel
}