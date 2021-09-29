import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";
import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";
import { ProductMap } from "../../mappers/ProductMap";
import { IRefuseCounerOfferUseCase } from "./IRefuseCounterOfferUseCase";

export class RefuseCounterOfferUseCase implements IRefuseCounerOfferUseCase {
    async execute(productId: string, deliveryFee: number, paymentHandler: IPaymentHandler, productRepository: IProductRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")

            let productDTO = ProductMap.toDTO(product)

            productDTO.sellingStatus = EPurchasePromiseStatus.Cancelled
            productDTO.priceSeller = 0
            
            await productRepository.save(ProductMap.toDomain(productDTO))
            await paymentHandler.acceptPayment(deliveryFee)
        } catch(error) {
            throw error
        }
    }
}