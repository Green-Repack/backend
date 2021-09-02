import { Produit } from "../../../domain/entity/Produit";

export interface IPanierDTO {
    items: Produit[]
    totalPrice: number
}