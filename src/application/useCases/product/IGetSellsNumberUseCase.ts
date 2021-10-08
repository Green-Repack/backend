import { IProductRepository } from "../../interfaces/repository/IProductRepository";

export interface IGetSellsNumberUseCase {
    execute(category: string, productRepository: IProductRepository): Promise<{[token: string]: number}>
}