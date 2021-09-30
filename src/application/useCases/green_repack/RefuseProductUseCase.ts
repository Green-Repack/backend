import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IDeliveryTicketHandler } from "../../interfaces/services/IDeliveryTicketHandler";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";
import { ProductMap } from "../../mappers/ProductMap";
import { IRefuseProductUseCase } from "./IRefuseProductUseCase";
import { NotFoundError } from "../../errors/NotFoundError";
import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";
import { UserMap } from "../../mappers/UserMap";

export class RefuseProductUseCase implements IRefuseProductUseCase {
    async execute(productId: string, paymentHandler: IPaymentHandler, deliveryHandler: IDeliveryTicketHandler, 
        userRepository: IUserRepository, productRepository: IProductRepository): Promise<{[token: string]: string}> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let intentKey: {[token: string]: string} = null

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")

            let merchant = await userRepository.getUserById(product.merchantId)
            if (merchant == undefined) throw new NotFoundError("Marchand not found")

            let productDTO = ProductMap.toDTO(product)
            let merchantDTO = UserMap.toDTO(merchant)

            if (productDTO.sellingStatus == EPurchasePromiseStatus.WaitingForApproval) {
                productDTO.sellingStatus = EPurchasePromiseStatus.Declined
                
                await userRepository.updateProductSoldStatus(merchant.email, productId, productDTO.sellingStatus)
                await productRepository.save(ProductMap.toDomain(productDTO))

                let secretKey = await await paymentHandler.generatePaymentIntentDeliveryFee(merchantDTO, "Frais de récupération", 
                deliveryHandler.getPriceFromWeight(product.weight))
                intentKey = {client_secret: secretKey}
            }
            return intentKey
        } catch(error) {
            throw(error)
        }
    }
    
}