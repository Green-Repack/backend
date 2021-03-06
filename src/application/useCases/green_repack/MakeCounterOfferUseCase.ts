import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";
import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { ProductMap } from "../../mappers/ProductMap";
import { IMakeCounterOfferUseCase } from "./IMakeCounterOfferUseCase";
import { NotFoundError } from "../../errors/NotFoundError";

export class MakeCounterOfferUseCase implements IMakeCounterOfferUseCase {
    async execute(productId: string, warehouseName: string, counterOffer: number, warehouseRepository: IWarehouseRepository, 
        productRepository: IProductRepository, userRepository: IUserRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")
            Guard.AgainstNullOrUndefined(warehouseName, "Warehouse's name is required")
            Guard.AgainstNullOrUndefined(counterOffer, "Counter offer is required")

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")

            let warehouse = await warehouseRepository.getWarehouseByName(warehouseName)
            if (warehouse == undefined) throw new NotFoundError("Warehouse not found")

            let merchant = await userRepository.getUserById(product.merchantId)
            if (merchant == undefined) throw new NotFoundError("Marchand not found")

            let productDTO = ProductMap.toDTO(product)
            if (productDTO.sellingStatus == EPurchasePromiseStatus.WaitingForApproval) {
                productDTO.sellingStatus = EPurchasePromiseStatus.WaitingForCounterOfferApproval
                productDTO.priceSeller = counterOffer
                productDTO.warehouseId = warehouse.id

                await userRepository.updateProductSoldStatus(merchant.email, productId, productDTO.sellingStatus)
                await productRepository.save(ProductMap.toDomain(productDTO))
            }
        } catch (error) {
            throw(error)
        }
    }
}