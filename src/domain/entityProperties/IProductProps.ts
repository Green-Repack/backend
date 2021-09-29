import { EProductCategory } from "./EProductCategory";
import { EProductState } from "./EProductState";
import { EPurchasePromiseStatus } from "./EPurchasePromiseStatus";
import { IProductSpecs } from "./IProductSpecs";

export interface IProductProps {
    productId: string
    name: string
    category: EProductCategory
    brand: string
    model: string
    sellingStatus: EPurchasePromiseStatus
    state: EProductState
    specificities: [{[name: string]: string}]
    price?: number
    priceSeller?: number
    images: string[]
    merchantId?: string
    warehouseId?: string
    sold: boolean
    creationDate: Date
    weight: number
    year: number
}