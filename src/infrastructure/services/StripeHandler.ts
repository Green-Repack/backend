import { injectable } from "inversify";
import { IUserDTO } from "../../application/DTOs/IUserDTO";
import { IStripeHandler } from "../../application/interfaces/services/IStripeHandler";
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
import { IProductDTO } from "../../application/DTOs/IProductDTO";

@injectable()
export class StripeHandler implements IStripeHandler {
    private static readonly stripe = new Stripe(config.STRIPE_SECRET_KEY, 
        {apiVersion: '2020-08-27',
        typescript: true})

    createWebhookEvent(reqBody: any, sig: any): any {
        let event;
        try {
            event = StripeHandler.stripe.webhooks.constructEvent(reqBody, sig, config.STRIPE_ENDPOINT_SECRET);
            return event
        } catch (err) {
            throw new Error(`Webhook Error: ${err.message}`)
        }
    }

    async generatePaymentIntentBuy(user: IUserDTO, reason: string, productId: string, amount: number): Promise<string> {
        try {
            let paymentIntent = await StripeHandler.stripe.paymentIntents.create({
                amount: Math.round(amount * 100),
                currency: "eur",
                receipt_email: user.email,
                description: `id product : ${productId}`,
                statement_descriptor: "green repack",
                customer: user.stripeCustomerId,
                payment_method_types: ['card'],
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

    async generatePaymentIntentDeliveryFee(user: IUserDTO, reason: string, productId: string, amount: number): Promise<string> {
        try {
            let paymentIntent = await StripeHandler.stripe.paymentIntents.create({
                amount: Math.round(amount * 100),
                currency: "eur",
                receipt_email: user.email,
                description: `Frais de récupération produit ${productId}`,
                statement_descriptor: "green repack",
                customer: user.stripeCustomerId,
                payment_method_types: ['card'],
                metadata: {
                    userId: user.id,
                    reason: reason,
                    productId: productId
                }
            })
            return paymentIntent.client_secret
        } catch(error) {
            throw error
        }
    }

    async createStripeCustomer(user: IUserDTO): Promise<string> {
        try {
            let customer = await StripeHandler.stripe.customers.create({
                description: `green repack customer`,
                email: user.email,
                name: user.lastName
            })
            if (customer) return customer.id
            else throw Error("Could not create stripe customer")
        } catch (error) {
            throw error
        }
    }

    async createStripeAccount(user: IUserDTO): Promise<string> {
        try {
            let account = await StripeHandler.stripe.accounts.create({
                type: "standard",
                email: user.email,
                country: "FR",
                business_type: "individual"
            })
            if (account != null) return account.id
            else throw Error("Could not create stripe account")
        } catch(error) {
            throw error
        }
    }

    async createStripeAccountLink(user: IUserDTO): Promise<void> {
        try {
            let accountLink = await StripeHandler.stripe.accountLinks.create({
                account: user.stripeAccountId!,
                refresh_url: config.REFESH_URL_STD,
                return_url: config.RETURN_URL,
                type: 'account_onboarding'
            })
        } catch (error) {
            throw error
        }
    }

    async createStripeProduct(product: IProductDTO): Promise<IProductDTO> {
        throw new Error("Method not implemented.");
    }

    async handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent, idGenerator: IGeneratorIdHandler, promoRepository: IPromoCoinsRepository,
        userRepository: IUserRepository, productRepository: IProductRepository, warehouseRepository: IWarehouseRepository): Promise<void> {
        try {
            let currentDate = new Date()
            let metadata = paymentIntent.metadata
            console.log("paymetIntent : ", paymentIntent)
            console.log("user id ", metadata.userId)
            console.log("product id ", metadata.productId)
            let user = await userRepository.getUserById(metadata.userId)
            if (user == undefined) throw new NotFoundError("User not found")

            let product = await productRepository.getProductById(metadata.productId)
            if (product == undefined) throw new NotFoundError("Product not found")

            if (metadata.reason == "achat") {
                let amount = paymentIntent.amount / 100
                let promoMultiplier = 1

                let promo = await promoRepository.getActivePromo(currentDate)
                if (promo != undefined) promoMultiplier = promo.multiplicateur

                let userDTO = UserMap.toDTO(user)
                let productDTO = ProductMap.toDTO(product)

                let greenCoinsAmount = (Math.floor(amount / 10) * promoMultiplier)
                let expireDate = new Date(currentDate.getFullYear() + 2 + "-01-01")
                
                userDTO.greenCoins.amount += greenCoinsAmount
                if (userDTO.greenCoins.expireDate == undefined) {
                    userDTO.greenCoins.expireDate = expireDate
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

    async emitPayment(amount: number, accountId: string): Promise<void> {
        try {
            const transfer = await StripeHandler.stripe.transfers.create({
                amount: Math.round(amount * 100),
                currency: "eur",
                destination: accountId,
            });
            console.log("id transfer : ", transfer.id)
        } catch (error) {
            throw error
        }
    }
}