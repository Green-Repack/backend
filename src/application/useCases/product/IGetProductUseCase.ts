import { IProductDTO } from "../../DTOs/IProductDTO";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";

export interface IGetProductUseCase {
    execute(productId: string, productRepository: IProductRepository): Promise<IProductDTO>
}