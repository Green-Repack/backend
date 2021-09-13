import { Repository } from "../Repositoty";
import { Product } from "../../entity/Product";

export interface IProductRepository extends Repository<Product> {
    getProductById(productId: string): Promise<Product | null>
    getProductByCategory(category: string): Promise<Product[]>
    getProductByFilter(filter: any): Promise<Product[]>
    getProductByMerchant(merchantId: string): Promise<Product[]>
    getAllProducts(): Promise<Product[]>
}
