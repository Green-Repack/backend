import { IProduitSpecs } from "../common/IProduitSpecs";

export interface IProduitProps {
    name: string
    type: string
    specificities: IProduitSpecs
    price?: number
    images: string[]
    marchandId?: string
    accepte: boolean
}