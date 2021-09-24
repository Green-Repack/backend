import { IProduitSpecs } from "../../domain/entityProperties/IProduitSpecs";

export interface IProduitDTO {
    id?: string
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