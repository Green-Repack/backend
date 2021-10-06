import { Product } from "../../../domain/entity/Product";
import { EProductCategory } from "../../../domain/entityProperties/EProductCategory";
import { IBaseRepository } from "./IBaseRepositoty";

export interface IProductRepository extends IBaseRepository<Product> {
    getProductById(clientId: string): Promise<Product | undefined>
    getProductSellsNumber(category: EProductCategory, brand: string, model: string, year: number): Promise<Product[]>
    getAllProducts(): Promise<Product[]>
    getProductByCategory(category: EProductCategory): Promise<Product[]>
    getProductByBrand(category: EProductCategory, brand: string): Promise<Product[]>
    getProductForValidation(): Promise<Product[]>
    getProductByStripId(id: string): Promise<Product | undefined>
}