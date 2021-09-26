import { injectable } from "inversify";
import { IProductRepository } from "../../../application/interfaces/repository/IProductRepository";
import { Product } from "../../../domain/entity/Product";

@injectable()
export class ProduitRepository implements IProductRepository {
    getProductById(clientId: string): Promise<Product | undefined> {
        throw new Error("Method not implemented.");
    }
    getProductSellsNumber(category: string, brand: string, model: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    getAllProducts(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    exists(idOrEmailOrUsername: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(t: Product): Promise<void> {
        throw new Error("Method not implemented.");
    }
    save(t: Product): Promise<void> {
        throw new Error("Method not implemented.");
    }
}