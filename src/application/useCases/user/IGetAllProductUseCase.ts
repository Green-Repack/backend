import { IProductDTO } from "../../DTOs/IProductDTO";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";

export interface IGetAllProductUseCase {
    execute(productRepository: IProductRepository): Promise<IProductDTO[]>
}