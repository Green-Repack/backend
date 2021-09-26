import { IProductSpecs } from "./IProductSpecs";

export interface IProductProps {
    name: string
    category: string
    brand: string
    model: string
    specificities: IProductSpecs
    price?: number
    priceSeller?: number
    images: string[]
    merchantId?: string
    warehouseId?: string
    accepted?: boolean
    sold: boolean
    creationDate: Date
    acceptationDate?: Date
}