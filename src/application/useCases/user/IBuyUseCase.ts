import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IStripeHandler } from "../../interfaces/services/IStripeHandler";

export interface IBuyUseCase {
    execute(userId: string, productId: string, stripeHandler: IStripeHandler, userRepository: IUserRepository, 
        productRepository: IProductRepository): Promise<{[token: string]: string}>
}