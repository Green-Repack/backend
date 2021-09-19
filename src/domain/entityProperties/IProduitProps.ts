import { IProduitSpecs } from "./IProduitSpecs";

export interface IProduitProps {
    name: string
    category: string
    brand: string
    model: string
    specificities: IProduitSpecs
    price?: number
    images: string[]
    marchandId?: string
    accepted?: boolean
    creationDate: Date
    acceptationDate?: Date
}