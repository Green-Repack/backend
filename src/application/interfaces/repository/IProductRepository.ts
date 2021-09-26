import { Product } from "../../../domain/entity/Product";
import { IBaseRepository } from "./IBaseRepositoty";

export interface IProductRepository extends IBaseRepository<Product> {
    getProductById(productId: string): Promise<Product | null>
    getProductByCategory(category: string): Promise<Product[]>
    getProductByFilter(filter: any): Promise<Product[]>
    getProductByMerchant(merchantId: string): Promise<Product[]>
    getAllProducts(): Promise<Product[]>
    getProductSellsNumber(category: string, brand: string, model: string): Promise<number>
}
