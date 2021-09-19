import { IProduitSpecs } from "../../../domain/interface/common/IProduitSpecs";

export interface IProduitDTO {
    name: string
    specificities: IProduitSpecs
    price?: number
    images: string[]
    marchandId?: string
    accepte: boolean
}