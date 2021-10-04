import {IProductPriceRepository} from "../../interfaces/repository/IProductPriceRepository";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IGeneratorIdHandler } from "../../interfaces/services/IGeneratorIdHandler";

export interface ISellUseCase {
    execute(userId: string, productInfo: unknown, idGenerator: IGeneratorIdHandler, userRepository: IUserRepository, 
        productRepository: IProductRepository, productPriceRepository: IProductPriceRepository): Promise<{[token: string]: string}>
}
