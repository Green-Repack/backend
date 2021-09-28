import { Product } from "../../../domain/entity/Product";
import { EProductCategory } from "../../../domain/entityProperties/EProductCategory";
import { IBaseRepository } from "./IBaseRepositoty";

export interface IProductRepository extends IBaseRepository<Product> {
    getProductById(clientId: string): Promise<Product | undefined>
    getProductSellsNumber(category: EProductCategory, brand: string, model: string, year: number): Promise<number>
    getAllProducts(): Promise<Product[]>
}