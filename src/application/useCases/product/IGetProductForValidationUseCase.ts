import { IProductDTO } from "../../DTOs/IProductDTO";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";

export interface IGetPoductForValidationUseCase {
    execute(productRepository: IProductRepository): Promise<IProductDTO[]>
}