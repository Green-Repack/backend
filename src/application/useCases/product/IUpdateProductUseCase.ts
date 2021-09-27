import { IProductPriceRepository } from "../../interfaces/repository/IProductPriceRepository";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";

export interface IUpdateProductUseCase {
    execute(product: unknown, productId: string, productRepository: IProductRepository, productPriceRepository: IProductPriceRepository, userId: string, admin: boolean): Promise<void>
}