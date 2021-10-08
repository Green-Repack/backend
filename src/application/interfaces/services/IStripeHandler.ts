import { IProductDTO } from "../../DTOs/IProductDTO";
import { IUserDTO } from "../../DTOs/IUserDTO";
import { IProductRepository } from "../repository/IProductRepository";
import { IPromoCoinsRepository } from "../repository/IPromoCoinsRepository";
import { IUserRepository } from "../repository/IUserRepository";
import { IWarehouseRepository } from "../repository/IWarehouseRepository";
import { IGeneratorIdHandler } from "./IGeneratorIdHandler";

export interface IStripeHandler {
    createStripeAccount(user: IUserDTO): Promise<string>
    createStripeCustomer(user: IUserDTO): Promise<string>
    createStripeAccountLink(user: IUserDTO): Promise<string> 
    createStripeProduct(product: IProductDTO): Promise<IProductDTO>
    createWebhookEvent(reqBody: any, sig: any): any
    emitPayment(amount: number, customerId: string): Promise<unknown>
    generatePaymentIntentBuy(user: IUserDTO, reason: string, productId: string, amount: number): Promise<string>
    generatePaymentIntentDeliveryFee(user: IUserDTO, reason: string, productId: string, amount: number): Promise<string>
    handlePaymentIntentSucceeded(paymentIntent: unknown, idGenerator: IGeneratorIdHandler, promoRepository: IPromoCoinsRepository,
        userRepository: IUserRepository, productRepository: IProductRepository, warehouseRepository: IWarehouseRepository): Promise<void>
}