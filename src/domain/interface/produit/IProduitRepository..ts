import { Repository } from "../Repositoty";
import { Produit } from "../../entity/Produit";

export interface IProduitRepository extends Repository<Produit> {
    getProduitById(produitId: string): Promise<Produit>
    getProduitByType(type: string): Promise<Produit[]>
    getProduitByMarchand(marchandId: string): Promise<Produit[]>
    getAllProducts(): Promise<Produit[]>
}