import { IProductRepository } from "../../interfaces/repository/IProductRepository";

export interface IGetSellsNumberUseCase {
    execute(category: string, brand: string, model: string, year: number, productRepository: IProductRepository): Promise<{[token: string]: number}>
}