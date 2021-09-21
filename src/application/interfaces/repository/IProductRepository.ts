import { Produit } from "../../../domain/entity/Produit";
import { IBaseRepository } from "./IBaseRepositoty";

export interface IProductRepository extends IBaseRepository<Produit> {
    getProductById(clientId: string): Promise<Produit | undefined>
    getProductSellsNumber(category: string, brand: string, model: string): Promise<number>
    getAllProducts(): Promise<Produit[]>
}