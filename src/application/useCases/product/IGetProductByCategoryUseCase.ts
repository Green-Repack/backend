import { IProductDTO } from "../../DTOs/IProductDTO";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";

export interface IGetProductByCategoryUseCase {
    execute(category: string, productRepository: IProductRepository): Promise<IProductDTO[]>
}