import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";
import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IDeliveryTicketHandler } from "../../interfaces/services/IDeliveryTicketHandler";
import { ProductMap } from "../../mappers/ProductMap";
import { IAcceptEstimationUseCase } from "./IAcceptEstimationUseCase";
import { NotFoundError } from "../../errors/NotFoundError";
import { IShippingLabel } from "../../../domain/entityProperties/IShippingLabel";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";

export class AcceptEstimationUseCase implements IAcceptEstimationUseCase {
    async execute(productId: string, warehouseName: string, deliveryHandler: IDeliveryTicketHandler, userRepository: IUserRepository, 
        productRepository: IProductRepository, warehouseRepository: IWarehouseRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")
            let expirationDate = new Date()
            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")
            
            let merchant = await userRepository.getUserById(product.merchantId)
            if (merchant == undefined) throw new NotFoundError("Merchant not found")

            let warehouse = await warehouseRepository.getWarehouseByName(warehouseName)
            if (warehouse == undefined) throw new NotFoundError("Warehouse not found")

            let productDTO = ProductMap.toDTO(product)
            if (productDTO.sellingStatus == EPurchasePromiseStatus.Estimtated) {
                productDTO.sellingStatus = EPurchasePromiseStatus.WaitingForApproval

                let labelUrl = await deliveryHandler.generate(merchant.lastName, merchant.firstName, 
                    merchant.address, warehouse.name, "", warehouse.location, product.weight, product.productId)
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