import { EProductCategory } from "../../domain/entityProperties/EProductCategory";
import { EProductState } from "../../domain/entityProperties/EProductState";
import { EPurchasePromiseStatus } from "../../domain/entityProperties/EPurchasePromiseStatus";

export interface IProductDTO {
    productId: string
    name: string
    category: EProductCategory
    brand: string
    model: string
    sellingStatus: EPurchasePromiseStatus
    state: EProductState,
    specificities: string[]
    price?: number
    priceSeller?: number
    images: string[]
    merchantId?: string
    warehouseId?: string
    stripeProductId?: string
    sold: boolean
    creationDate: Date
    weight: number
    year: number
}