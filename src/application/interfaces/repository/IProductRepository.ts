import { Product } from "../../../domain/entity/Product";
import { IBaseRepository } from "./IBaseRepositoty";

export interface IProductRepository extends IBaseRepository<Product> {
    getProductById(clientId: string): Promise<Product | undefined>
    getProductSellsNumber(category: string, brand: string, model: string): Promise<number>
    getAllProducts(): Promise<Product[]>
}