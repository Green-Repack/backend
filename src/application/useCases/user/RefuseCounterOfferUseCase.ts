import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";
import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";
import { ProductMap } from "../../mappers/ProductMap";
import { IRefuseCounerOfferUseCase } from "./IRefuseCounterOfferUseCase";
import { NotFoundError } from "../../errors/NotFoundError";
import { UserMap } from "../../mappers/UserMap";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";

export class RefuseCounterOfferUseCase implements IRefuseCounerOfferUseCase {
    async execute(productId: string, deliveryFee: number, paymentHandler: IPaymentHandler, 
        userRepository: IUserRepository, productRepository: IProductRepository): Promise<{[token: string]: string}> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let intentKey: {[token: string]: string} = null
            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")

            let merchant = await userRepository.getUserById(product.merchantId)
            if (merchant == undefined) throw new NotFoundError("Merchant not found")

            let productDTO = ProductMap.toDTO(product)
            let merchantDTO = UserMap.toDTO(merchant)

            if (productDTO.sellingStatus == EPurchasePromiseStatus.WaitingForCounterOfferApproval) {
                productDTO.sellingStatus = EPurchasePromiseStatus.CounterOfferDeclined
                
                await userRepository.updateProductSoldStatus(merchantDTO.email, productDTO.productId, productDTO.sellingStatus)
                await productRepository.save(ProductMap.toDomain(productDTO))
                let secretKey = await await paymentHandler.generatePaymentIntentDeliveryFee(merchantDTO, "Frais de récupération", deliveryFee)
                intentKey = {client_secret: secretKey}
            }
            
            return intentKey
        } catch(error) {
            throw(error)
        }
    }
}