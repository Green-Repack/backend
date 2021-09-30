import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IDeliveryTicketHandler } from "../../interfaces/services/IDeliveryTicketHandler";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";

export interface IRefuseCounerOfferUseCase {
    execute(productId: string, paymentHandler: IPaymentHandler, deliveryTicketHanlder: IDeliveryTicketHandler,
        userRepository: IUserRepository, productRepository: IProductRepository): Promise<{[token: string]: string}>
}