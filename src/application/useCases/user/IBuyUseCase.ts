import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";

export interface IBuyUseCase {
    execute(userId: string, productId: string, paymentHandler: IPaymentHandler, userRepository: IUserRepository, 
        productRepository: IProductRepository): Promise<{[token: string]: string}>
}