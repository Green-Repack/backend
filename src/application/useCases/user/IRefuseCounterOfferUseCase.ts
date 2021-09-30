import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IDeliveryTicketHandler } from "../../interfaces/services/IDeliveryTicketHandler";
import { IStripeHandler } from "../../interfaces/services/IStripeHandler";

export interface IRefuseCounerOfferUseCase {
    execute(productId: string, stripeHandler: IStripeHandler, deliveryTicketHanlder: IDeliveryTicketHandler,
        userRepository: IUserRepository, productRepository: IProductRepository): Promise<{[token: string]: string}>
}