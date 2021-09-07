import { IProductSpecs } from "../../../domain/interface/common/IProductSpecs";
import {ProductCategory} from "../enum/ProductCategory";
import {ProductState} from "../enum/ProductState";
import {PurchasePromiseState} from "../enum/PurchasePromiseState";

export interface IProductDTO {
    name: string
    specificities: IProductSpecs
    category: ProductCategory
    state: ProductState
    initialPrice: number
    displayPrice: number
    photos: string[]
    marchandId: string
    accepte: boolean
    status: PurchasePromiseState
    weight: number
}