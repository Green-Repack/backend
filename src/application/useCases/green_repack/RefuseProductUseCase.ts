import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IDeliveryTicketHandler } from "../../interfaces/services/IDeliveryTicketHandler";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";
import { ProductMap } from "../../mappers/ProductMap";
import { IRefuseProductUseCase } from "./IRefuseProductUseCase";

export class RefuseProductUseCase implements IRefuseProductUseCase {
    async execute(productId: string, deliveryFee: number, paymentHandler: IPaymentHandler, deliveryHandler: IDeliveryTicketHandler, 
        userRepository: IUserRepository, productRepository: IProductRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")

            let merchant = await userRepository.getUserById(product.merchantId)
            if (merchant == undefined) throw new NotFoundError("Marchand not found")

            let productDTO = ProductMap.toDTO(product)

            productDTO.accepted = false
            productDTO.acceptationDate = new Date()
            productDTO.priceSeller = 0
            
            await productRepository.save(ProductMap.toDomain(productDTO))
            await paymentHandler.acceptPayment(deliveryFee)
        } catch(error) {
            throw error
        }
    }
    
}