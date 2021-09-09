import { IProductSpecs } from "../common/IProductSpecs";
import {PurchasePromiseStatus} from "../../../application/user/enum/PurchasePromiseStatus";
import {ProductState} from "../../../application/user/enum/ProductState";
import {ProductCategory} from "../../../application/user/enum/ProductCategory";

export interface IProductProps {
    name: string
    creatorId?: string
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