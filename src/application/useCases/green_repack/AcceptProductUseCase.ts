import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { IStripeHandler } from "../../interfaces/services/IStripeHandler";
import { ProductMap } from "../../mappers/ProductMap";
import { IAcceptProductUseCase } from "./IAcceptProductUseCase";
import { NotFoundError } from "../../errors/NotFoundError";
import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";
import { IPushNotifHandler } from "../../interfaces/services/IPushNotifHandler";

export class AcceptProductUseCase implements IAcceptProductUseCase {
    async execute(productId: string, warehouseName: string, stripeHandler: IStripeHandler, pushNotifHandler: IPushNotifHandler,
        userRepository: IUserRepository,productRepository: IProductRepository, warehouseRepository: IWarehouseRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")
            
            let warehouse = await warehouseRepository.getWarehouseByName(warehouseName)
            if (warehouse == undefined) throw new NotFoundError("Warehouse not found")
            
            let merchant = await userRepository.getUserById(product.merchantId)
            if (merchant == undefined) throw new NotFoundError("Merchant not found")
            
            let productDTO = ProductMap.toDTO(product)

            if (productDTO.sellingStatus == EPurchasePromiseStatus.WaitingForApproval) {
                productDTO.sellingStatus = EPurchasePromiseStatus.Accepted
                productDTO.warehouseId = warehouse.id
                productDTO.price = productDTO.priceSeller + (productDTO.priceSeller * 0.3)

                await userRepository.updateProductSoldStatus(merchant.email, productId, productDTO.sellingStatus)
                await userRepository.updateProductSoldPriceReceived(merchant.email, productId, productDTO.priceSeller)
                await userRepository.updateProductSoldDate(merchant.email, productId, new Date())

                let updatedProduct = ProductMap.toDomain(productDTO)
                await userRepository.updateProductSoldPriceReceived(merchant.email, productId, productDTO.priceSeller)
                await warehouseRepository.updateStockProduct(updatedProduct, false)
                await productRepository.save(ProductMap.toDomain(productDTO))

                await stripeHandler.emitPayment(product.priceSeller, merchant.stripeCustomerId)
                pushNotifHandler.sendNotification(updatedProduct)
            }
        } catch(error) {
            throw(error)
        }
    }
    
}