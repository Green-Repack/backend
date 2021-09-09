import { IProductSpecs } from "../../../domain/interface/common/IProductSpecs";
import {ProductCategory} from "../enum/ProductCategory";
import {ProductState} from "../enum/ProductState";
import {PurchasePromiseStatus} from "../enum/PurchasePromiseStatus";

export interface IProductDTO {
    name: string
    creatorId: string
    category: ProductCategory
    specificities: IProductSpecs
    initialPrice?: number
    displayPrice?: number
    images: string[]
    status: PurchasePromiseStatus
    state: ProductState
    weight: number
    accepted: boolean
}