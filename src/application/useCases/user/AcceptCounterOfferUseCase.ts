import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";
import { IProductSold } from "../../../domain/entityProperties/IProductSold";
import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { IStripeHandler } from "../../interfaces/services/IStripeHandler";
import { ProductMap } from "../../mappers/ProductMap";
import { UserMap } from "../../mappers/UserMap";
import { IAcceptCounterOfferUseCase } from "./IAcceptCounterOfferUseCase";
import { NotFoundError } from "../../errors/NotFoundError";
import { IPushNotifHandler } from "../../interfaces/services/IPushNotifHandler";

export class AcceptCounterOfferUseCase implements IAcceptCounterOfferUseCase {
    async execute(productId: string, stripeHandler: IStripeHandler, pushNotifHandler: IPushNotifHandler,
        userRepository: IUserRepository, productRepository: IProductRepository, warehouseRepository: IWarehouseRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")

            let merchant = await userRepository.getUserById(product.merchantId)
            if (merchant == undefined) throw new NotFoundError("Marchand not found")

            let productDTO = ProductMap.toDTO(product)
            let merchantDTO = UserMap.toDTO(merchant)

            if (productDTO.sellingStatus == EPurchasePromiseStatus.WaitingForCounterOfferApproval) {
                productDTO.sellingStatus = EPurchasePromiseStatus.Accepted
                productDTO.price = Number.parseFloat((productDTO.priceSeller + (productDTO.priceSeller * 0.3).toFixed(2)))
                
                if (merchantDTO.productSold == undefined) merchantDTO.productSold = new Array<IProductSold>()

                await userRepository.updateProductSoldStatus(merchant.email, productId, productDTO.sellingStatus)
                await userRepository.updateProductSoldPriceReceived(merchant.email, productId, productDTO.priceSeller)
                await userRepository.updateProductSoldDate(merchant.email, productId, new Date())

                let updatedProduct = ProductMap.toDomain(productDTO)
                await productRepository.save(updatedProduct)
                await warehouseRepository.updateStockProduct(updatedProduct, true)

                await stripeHandler.emitPayment(product.priceSeller, merchant.stripeCustomerId)
                pushNotifHandler.sendNotification(updatedProduct)
            }
        } catch(error) {
            throw(error)
        }
    } 
}