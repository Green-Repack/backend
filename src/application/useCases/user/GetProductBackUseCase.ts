import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus"
import { Guard } from "../../commons/Guard"
import { IProductRepository } from "../../interfaces/repository/IProductRepository"
import { IUserRepository } from "../../interfaces/repository/IUserRepository"
import { IDeliveryTicketHandler } from "../../interfaces/services/IDeliveryTicketHandler"
import { IStripeHandler } from "../../interfaces/services/IStripeHandler"
import { ProductMap } from "../../mappers/ProductMap"
import { UserMap } from "../../mappers/UserMap"
import { IGetProductBackUseCase } from "./IGetProductBackUseCase"
import { NotFoundError } from "../../errors/NotFoundError"

export class GetProductBackUseCase implements IGetProductBackUseCase {
    async execute(productId: string, stripeHandler: IStripeHandler, deliveryHandler: IDeliveryTicketHandler, 
        userRepository: IUserRepository, productRepository: IProductRepository): Promise<{ [token: string]: string }> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let intentKey: {[token: string]: string} = null

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")

            let merchant = await userRepository.getUserById(product.merchantId)
            if (merchant == undefined) throw new NotFoundError("Marchand not found")

            let productDTO = ProductMap.toDTO(product)
            let merchantDTO = UserMap.toDTO(merchant)

            if (productDTO.sellingStatus == EPurchasePromiseStatus.Declined) {
                let secretKey = await await stripeHandler.generatePaymentIntentDeliveryFee(merchantDTO, "Frais de récupération", 
                deliveryHandler.getPriceFromWeight(product.weight))
                intentKey = {client_secret: secretKey}
            }
            return intentKey
        } catch(error) {
            throw(error)
        }
    }
    
}