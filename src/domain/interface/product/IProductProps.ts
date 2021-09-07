import { IProductSpecs } from "../common/IProductSpecs";

export interface IProductProps {
    name: string
    type: string
    specificities: IProductSpecs
    price?: number
    images: string[]
    marchandId?: string
    accepte: boolean
}