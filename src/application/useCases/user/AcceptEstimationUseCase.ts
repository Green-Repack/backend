import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";
import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IDeliveryTicketHandler } from "../../interfaces/services/IDeliveryTicketHandler";
import { ProductMap } from "../../mappers/ProductMap";
import { IAcceptEstimationUseCase } from "./IAcceptEstimationUseCase";
import { NotFoundError } from "../../errors/NotFoundError";

export class AcceptEstimationUseCase implements IAcceptEstimationUseCase {
    async execute(productId: string, deliveryHandler: IDeliveryTicketHandler, userRepository: IUserRepository, 
        productRepository: IProductRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")
            
            let marchand = await userRepository.getUserById(product.merchantId)
            if (marchand == undefined) throw new NotFoundError("Marchand not found")

            let productDTO = ProductMap.toDTO(product)
            productDTO.sellingStatus = EPurchasePromiseStatus.WaitingForApproval

            await productRepository.save(ProductMap.toDomain(productDTO))
            //await deliveryHandler.generate(marchand) génération du ticket colissimo
        } catch(error) {
            throw(error)
        }
    }
}