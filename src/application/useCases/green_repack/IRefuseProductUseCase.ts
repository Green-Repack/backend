import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";

export interface IRefuseProductUseCase {
    execute(productId: string, userRepository: IUserRepository,productRepository: IProductRepository): Promise<void>
}