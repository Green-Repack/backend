import { IProductRepository } from "../../interfaces/repository/IProductRepository";

export interface IRefuseEstimationUseCase {
    execute(productId: string, productRepository: IProductRepository): Promise<void>
}