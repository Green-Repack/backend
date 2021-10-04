import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IDeliveryTicketHandler } from "../../interfaces/services/IDeliveryTicketHandler";
import { IStripeHandler } from "../../interfaces/services/IStripeHandler";

export interface IGetProductBackUseCase {
    execute(productId: string, paymentHandler: IStripeHandler, deliveryHandler: IDeliveryTicketHandler, 
        userRepository: IUserRepository,productRepository: IProductRepository): Promise<{[token: string]: string}>
}