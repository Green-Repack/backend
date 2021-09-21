import { UserRepository } from "../../../infrastructure/persistence/repositories/UserRepository";
import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { IDeliveryTicketHandler } from "../../interfaces/services/IDeliveryTicketHandler";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";
import { ProductMap } from "../../mappers/ProductMap";
import { IMakeCounterOfferUseCase } from "./IMakeCounterOfferUseCase";

export class MakeCounterOfferUseCase implements IMakeCounterOfferUseCase {
    async execute(productId: string, counterOffer: number, deliveryHandler: IDeliveryTicketHandler, paymentHanlder: IPaymentHandler,
        warehouseName: string, warehouseRepository: IWarehouseRepository, productRepository: IProductRepository, userRepository: IUserRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")

            let warehouse = await warehouseRepository.getWarehouseByName(warehouseName)
            if (warehouse == undefined) throw new NotFoundError("Warehouse not found")

            let marchand = await userRepository.getUserById(product.marchandId)
            if (marchand == undefined) throw new NotFoundError("Marchand not found")

            let productDTO = ProductMap.toDTO(product)
            productDTO.priceSeller = counterOffer
            productDTO.warehouseId = warehouse.id
            productDTO.accepted = true
            productDTO.acceptationDate = new Date()
            
            await warehouseRepository.updateStockProduct(ProductMap.toDomain(productDTO), warehouse.id)
            await productRepository.save(ProductMap.toDomain(product))

            paymentHanlder.emitPayment(counterOffer, product.marchandId)
            deliveryHandler.generate(marchand)
        } catch (error) {
            throw error
        }
    }
}