import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { IDeliveryTicketHandler } from "../../interfaces/services/IDeliveryTicketHandler";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";
import { ProductMap } from "../../mappers/ProductMap";
import { IAcceptProductUseCase } from "./IAcceptProductUseCase";

export class AcceptProductUseCase implements IAcceptProductUseCase {
    async execute(productId: string, warehouseName: string, deliveryTicketHandler: IDeliveryTicketHandler, paymentHanlder: IPaymentHandler, 
        userRepository: IUserRepository, productRepository: IProductRepository, warehouseRepository: IWarehouseRepository, counterOffer?: number): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")

            let warehouse = await warehouseRepository.getWarehouseByName(warehouseName)
            if (warehouse == undefined) throw new NotFoundError("Warehouse not found")

            let marchand = await userRepository.getUserById(product.marchandId)
            if (marchand == undefined) throw new NotFoundError("Marchand not found")

            let productDTO = ProductMap.toDTO(product)

            if (counterOffer != undefined) productDTO.priceSeller = counterOffer
            
            productDTO.accepted = true
            productDTO.acceptationDate = new Date()
            productDTO.warehouseId = warehouse.id

            await warehouseRepository.updateStockProduct(ProductMap.toDomain(productDTO), warehouse.id)
            await productRepository.save(ProductMap.toDomain(productDTO))

            deliveryTicketHandler.generate(marchand)
            paymentHanlder.emitPayment(product.priceSeller, marchand.id)
        } catch(error) {
            throw error
        }
    }
    
}