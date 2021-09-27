import { Product } from "../../../domain/entity/Product";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";

export interface IGetProductUseCase {
    execute(productId: string, productRepository: IProductRepository): Promise<Product>
}