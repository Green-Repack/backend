import { IUserDTO } from "../../DTOs/IUserDTO";
import { IProductRepository } from "../repository/IProductRepository";
import { IPromoCoinsRepository } from "../repository/IPromoCoinsRepository";
import { IUserRepository } from "../repository/IUserRepository";
import { IWarehouseRepository } from "../repository/IWarehouseRepository";
import { IGeneratorIdHandler } from "./IGeneratorIdHandler";

export interface IPaymentHandler {
    createStripeCustomer(user: IUserDTO): Promise<IUserDTO>
    emitPayment(amount: number, customerId: string): Promise<unknown>
    generateBill(customerId: string): Promise<void>
    generatePaymentIntentBuy(user: IUserDTO, reason: string, productId: string, amount: number): Promise<string>
    generatePaymentIntentDeliveryFee(user: IUserDTO, reason: string, amount: number): Promise<string>
    handlePaymentIntentSucceeded(paymentIntent: unknown, idGenerator: IGeneratorIdHandler, promoRepository: IPromoCoinsRepository,
        userRepository: IUserRepository, productRepository: IProductRepository, warehouseRepository: IWarehouseRepository): Promise<void>
}