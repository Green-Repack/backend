import { Product } from "../../entity/Product";

export interface IPanierProps {
    items: Product[]
    totalPrice: number
}