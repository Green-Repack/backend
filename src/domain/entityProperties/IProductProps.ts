import { IProduitSpecs } from "./IProduitSpecs";

export interface IProductProps {
    name: string
    category: string
    brand: string
    model: string
    specificities: IProduitSpecs
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