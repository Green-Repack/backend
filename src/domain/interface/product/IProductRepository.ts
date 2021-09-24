import { Product } from "../../entity/Product";
import { IBaseRepository } from "../../../application/interfaces/repository/IBaseRepositoty";

export interface IProductRepository extends IBaseRepository<Product> {
    getProductById(productId: string): Promise<Product | null>
    getProductByCategory(category: string): Promise<Product[]>
    getProductByFilter(filter: any): Promise<Product[]>
    getProductByMerchant(merchantId: string): Promise<Product[]>
    getAllProducts(): Promise<Product[]>
}
