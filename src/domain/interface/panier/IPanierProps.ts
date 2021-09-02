import { Produit } from "../../entity/Produit";

export interface IPanierProps {
    items: Produit[]
    totalPrice: number
}