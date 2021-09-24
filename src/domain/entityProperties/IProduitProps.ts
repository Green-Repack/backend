import { IProduitSpecs } from "./IProduitSpecs";

export interface IProduitProps {
    name: string
    category: string
    brand: string
    model: string
    specificities: IProduitSpecs
    price?: number
    priceSeller?: number
    images: string[]
    marchandId?: string
    warehouseId?: string
    accepted?: boolean
    sold: boolean
    creationDate: Date
    acceptationDate?: Date
}