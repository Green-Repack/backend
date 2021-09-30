import { injectable } from "inversify";
import { IUserDTO } from "../../application/DTOs/IUserDTO";
import { IPaymentHandler } from "../../application/interfaces/services/IPaymentHandler";
import Stripe from "stripe";
import config from "../../../config";
import { UserMap } from "../../application/mappers/UserMap";
import { IUserRepository } from "../../application/interfaces/repository/IUserRepository";
import { IProductRepository } from "../../application/interfaces/repository/IProductRepository";
import { ProductMap } from "../../application/mappers/ProductMap";
import { IUserOrders } from "../../domain/entityProperties/IUserOrders";
import { IGeneratorIdHandler } from "../../application/interfaces/services/IGeneratorIdHandler";
import { IWarehouseRepository } from "../../application/interfaces/repository/IWarehouseRepository";
import { IPromoCoinsRepository } from "../../application/interfaces/repository/IPromoCoinsRepository";
import { NotFoundError } from "../../application/errors/NotFoundError";

@injectable()
export class PaymentHandler implements IPaymentHandler {
    private static readonly stripe = new Stripe(config.STRIPE_SECRET_KEY, 
        {apiVersion: '2020-08-27',
        typescript: true})

    createWebhookEvent(reqBody: any, sig: any): any {
        let event;
        try {
            event = PaymentHandler.stripe.webhooks.constructEvent(reqBody, sig, config.STRIPE_ENDPOINT_SECRET);
            return event
        } catch (err) {
            throw new Error(`Webhook Error: ${err.message}`)
        }
    }
    
    async generatePaymentIntentBuy(user: IUserDTO, reason: string, productId: string, amount: number): Promise<string> {
        try {
            let paymentIntent = await PaymentHandler.stripe.paymentIntents.create({
                amount: amount * 100,
                currency: "eur",
                receipt_email: user.email,
                description: `id product : ${productId}`,
                statement_descriptor: "greenRepack",
                metadata: {
                    productId: productId,
                    userId: user.id,
                    reason: reason
                }
            })
            return paymentIntent.client_secret
        } catch(error) {
            throw error
        }
    }

    async generatePaymentIntentDeliveryFee(user: IUserDTO, reason: string, amount: number): Promise<string> {
        try {
            let paymentIntent = await PaymentHandler.stripe.paymentIntents.create({
                amount: amount * 100,
                currency: "eur",
                receipt_email: user.email,
                description: `Frais de récupération`,
                statement_descriptor: "greenRepack",
                metadata: {
                    userId: user.id,
                    reason: reason
                }
            })
            return paymentIntent.client_secret
        } catch(error) {
            throw error
        }
    }

    async createStripeCustomer(user: IUserDTO): Promise<IUserDTO> {
        try {
            let params = {
                description: `green repack customer`,
                email: user.email,
                name: user.lastName,
            }
            let customer = await PaymentHandler.stripe.customers.create(params)
            if (customer) user.stripeCustomerId = customer.id
            else throw Error("Could not create stripe customer")
            return user
        } catch(error) {
            throw error
        }
    }

    async handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent, idGenerator: IGeneratorIdHandler, promoRepository: IPromoCoinsRepository,
        userRepository: IUserRepository, productRepository: IProductRepository, warehouseRepository: IWarehouseRepository): Promise<void> {
        try {
            let currentDate = new Date()
            let metadata = paymentIntent.metadata
            let user = await userRepository.getUserById(metadata.userId)
            if (user == undefined) throw new NotFoundError("User not found")

            let product = await productRepository.getProductById(metadata.productId)
            if (product == undefined) throw new NotFoundError("Product not found")

            if (metadata.reason == "achat") {
                let amount = paymentIntent.amount
                let promoMultiplier = 1


                let promo = await promoRepository.getActivePromo(currentDate)
                if (promo != undefined) promoMultiplier = promo.multiplicateur

                let userDTO = UserMap.toDTO(user)
                let productDTO = ProductMap.toDTO(product)

                userDTO.greenCoins.amount += ((amount % 10) * promoMultiplier)
                if (userDTO.greenCoins.expireDate == undefined) {
                    userDTO.greenCoins.expireDate = new Date(1, 1, currentDate.getFullYear() + 2)
                }

                let order: IUserOrders = {
                    id: idGenerator.generate(),
                    amount: amount,
                    paymentDate: new Date(),
                    productId: product.productId
                }

                userDTO.orders.push(order)
                productDTO.sold = true

                await userRepository.save(UserMap.toDomain(userDTO))
                await productRepository.save(ProductMap.toDomain(productDTO))
                await warehouseRepository.updateStockProduct(product, true)
            } else if (metadata.reason == "Frais de récupération") {
                await userRepository.updateProductSoldDeliveryFeeStatut(user.email, product.productId, true)
            }
        } catch(error) {
            throw error
        }
    }

    emitPayment(amount: number, customerId: string): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
}