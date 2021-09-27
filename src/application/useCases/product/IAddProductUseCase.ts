import { Product } from "../../../domain/entity/Product";
import { IProductPriceRepository } from "../../interfaces/repository/IProductPriceRepository";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";

export interface IAddProductUseCase {
    execute(productInfo: any, productRepository: IProductRepository, productPriceRepository: IProductPriceRepository, creatorId: string): Promise<Product>
}