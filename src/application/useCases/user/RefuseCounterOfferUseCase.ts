import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";
import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";
import { ProductMap } from "../../mappers/ProductMap";
import { IRefuseCounerOfferUseCase } from "./IRefuseCounterOfferUseCase";
import { NotFoundError } from "../../errors/NotFoundError";

export class RefuseCounterOfferUseCase implements IRefuseCounerOfferUseCase {
    async execute(productId: string, deliveryFee: number, paymentHandler: IPaymentHandler, productRepository: IProductRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")

            let productDTO = ProductMap.toDTO(product)

            productDTO.sellingStatus = EPurchasePromiseStatus.CounterOfferDeclined
            
            await productRepository.save(ProductMap.toDomain(productDTO))
            //await paymentHandler.acceptPayment(deliveryFee) déclenché le paiement des frais de livraison
        } catch(error) {
            throw(error)
        }
    }
}