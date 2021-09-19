import { Product } from "../../../domain/entity/Product";

export interface IPanierDTO {
    items: Product[]
    totalPrice: number
}