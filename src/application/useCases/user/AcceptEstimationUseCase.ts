import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";
import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IDeliveryTicketHandler } from "../../interfaces/services/IDeliveryTicketHandler";
import { ProductMap } from "../../mappers/ProductMap";
import { IAcceptEstimationUseCase } from "./IAcceptEstimationUseCase";
import { NotFoundError } from "../../errors/NotFoundError";
import { UserMap } from "../../mappers/UserMap";
import { IProductSold } from "../../../domain/entityProperties/IProductSold";
import { IShippingLabel } from "../../../domain/entityProperties/IShippingLabel";

export class AcceptEstimationUseCase implements IAcceptEstimationUseCase {
    async execute(productId: string, deliveryHandler: IDeliveryTicketHandler, userRepository: IUserRepository, 
        productRepository: IProductRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")
            let expirationDate = new Date()
            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")
            
            let merchant = await userRepository.getUserById(product.merchantId)
            if (merchant == undefined) throw new NotFoundError("Marchand not found")

            let productDTO = ProductMap.toDTO(product)
            if (productDTO.sellingStatus == EPurchasePromiseStatus.Estimtated) {
                productDTO.sellingStatus = EPurchasePromiseStatus.WaitingForApproval

                let labelUrl = null // await deliveryHandler.generate(marchand) génération du ticket colissimo
                expirationDate.setDate(expirationDate.getDate() + 15)
                let shippingLabel: IShippingLabel = {
                    url: labelUrl,
                    expirationDate: expirationDate,
                    expired: false
                }

                await userRepository.updateProductSoldStatus(merchant.email, productId, productDTO.sellingStatus)
                await userRepository.updateProductSoldAddShippingLabel(merchant.email, productId, shippingLabel)
                await productRepository.save(ProductMap.toDomain(productDTO))
            }
        } catch(error) {
            throw(error)
        }
    }
}