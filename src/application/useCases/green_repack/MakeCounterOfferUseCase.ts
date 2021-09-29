import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";
import { Guard } from "../../commons/Guard";
import { IProductDTO } from "../../DTOs/IProductDTO";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { ProductMap } from "../../mappers/ProductMap";
import { IMakeCounterOfferUseCase } from "./IMakeCounterOfferUseCase";
import { NotFoundError } from "../../errors/NotFoundError";

export class MakeCounterOfferUseCase implements IMakeCounterOfferUseCase {
    async execute(productId: string, warehouseName: string, counterOffer: number, warehouseRepository: IWarehouseRepository, 
        productRepository: IProductRepository, userRepository: IUserRepository): Promise<IProductDTO> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")
            Guard.AgainstNullOrUndefined(warehouseName, "Warehouse's name is required")
            Guard.AgainstNullOrUndefined(counterOffer, "Counter offer is required")

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")

            let warehouse = await warehouseRepository.getWarehouseByName(warehouseName)
            if (warehouse == undefined) throw new NotFoundError("Warehouse not found")

            let marchand = await userRepository.getUserById(product.merchantId)
            if (marchand == undefined) throw new NotFoundError("Marchand not found")

            let productDTO = ProductMap.toDTO(product)
            productDTO.sellingStatus = EPurchasePromiseStatus.WaitingForCounterOfferApproval
            productDTO.priceSeller = counterOffer
            productDTO.warehouseId = warehouse.id

            await productRepository.save(ProductMap.toDomain(product))

            return productDTO
        } catch (error) {
            throw error
        }
    }
}