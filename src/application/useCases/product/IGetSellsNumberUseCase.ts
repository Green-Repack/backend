import { IProductRepository } from "../../interfaces/repository/IProductRepository";

export interface IGetSellsNumberUseCase {
    execute(productInfo: unknown, productRepository: IProductRepository): Promise<number>
}