import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";

export interface IRefuseCounerOfferUseCase {
    execute(productId: string, deliveryFee: number, paymentHandler: IPaymentHandler, productRepository: IProductRepository): Promise<void>
}