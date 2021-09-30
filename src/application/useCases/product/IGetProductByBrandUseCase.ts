import { IProductDTO } from "../../DTOs/IProductDTO";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";

export interface IGetProductByBrandUseCase {
    execute(category: string, brand: string, productRepository: IProductRepository): Promise<IProductDTO[]>
}