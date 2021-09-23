import { IProductRepository } from "../../../application/interfaces/repository/IProductRepository";
import { Produit } from "../../../domain/entity/Produit";

export class ProduitRepository implements IProductRepository {
    getProductById(clientId: string): Promise<Produit | undefined> {
        throw new Error("Method not implemented.");
    }
    getProductSellsNumber(category: string, brand: string, model: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    getAllProducts(): Promise<Produit[]> {
        throw new Error("Method not implemented.");
    }
    exists(idOrEmailOrUsername: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(t: Produit): Promise<void> {
        throw new Error("Method not implemented.");
    }
    save(t: Produit): Promise<void> {
        throw new Error("Method not implemented.");
    }
}