import {ProductCategory} from "../../application/user/enum/ProductCategory";
import {ProductState} from "../../application/user/enum/ProductState";
import {PurchasePromiseStatus} from "../../application/user/enum/PurchasePromiseStatus";

export interface IProductProps {
    name: string
    category: ProductCategory
    brand: string
    model: string
    specificities: [{name: string, detail: string}]
    status: PurchasePromiseStatus
    state: ProductState
    price?: number
    priceSeller?: number
    images: string[]
    merchantId?: string
    warehouseId?: string
    accepted?: boolean
    creationDate: Date
    acceptationDate?: Date
    weight: number
}