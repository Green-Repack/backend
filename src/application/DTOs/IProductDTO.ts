import { IProduitSpecs } from "../../domain/entityProperties/IProduitSpecs";
import {ProductCategory} from "../user/enum/ProductCategory";
import {ProductState} from "../user/enum/ProductState";
import {PurchasePromiseStatus} from "../user/enum/PurchasePromiseStatus";

export interface IProductDTO {
    id?: string
    name: string
    category: ProductCategory
    brand: string
    model: string
    specificities: IProduitSpecs
    status: PurchasePromiseStatus
    state: ProductState
    price?: number
    priceSeller?: number
    images: string[]
    merchantId?: string
    warehouseId?: string
    accepted?: boolean
    creationDate: Date
    weight: number,
    acceptationDate?: Date
}