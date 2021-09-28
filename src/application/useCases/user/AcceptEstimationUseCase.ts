import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IDeliveryTicketHandler } from "../../interfaces/services/IDeliveryTicketHandler";
import { IAcceptEstimationUseCase } from "./IAcceptEstimationUseCase";

export class AcceptEstimationUseCase implements IAcceptEstimationUseCase {
    async execute(productId: string, deliveryHandler: IDeliveryTicketHandler, userRepository: IUserRepository, 
        productRepository: IProductRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")
            
            let marchand = await userRepository.getUserById(product.merchantId)
            if (marchand == undefined) throw new NotFoundError("Marchand not found")

            await deliveryHandler.generate(marchand)
        } catch(error) {
            throw error
        }
    }
}