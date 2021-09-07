import { Repository } from "../Repositoty";
import { Product } from "../../entity/Product";

export interface IProductRepository extends Repository<Product> {
    getProduitById(productId: string): Promise<Product>
    getProduitByType(type: string): Promise<Product[]>
    getProduitByMarchand(marchandId: string): Promise<Product[]>
    getAllProducts(): Promise<Product[]>
}