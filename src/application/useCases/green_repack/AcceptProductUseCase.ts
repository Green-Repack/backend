import { IProductSold } from "../../../domain/entityProperties/IProductSold";
import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";
import { ProductMap } from "../../mappers/ProductMap";
import { UserMap } from "../../mappers/UserMap";
import { IAcceptProductUseCase } from "./IAcceptProductUseCase";
import { NotFoundError } from "../../errors/NotFoundError";

export class AcceptProductUseCase implements IAcceptProductUseCase {
    async execute(productId: string, warehouseName: string, paymentHanlder: IPaymentHandler, userRepository: IUserRepository,
         productRepository: IProductRepository, warehouseRepository: IWarehouseRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")
            
            let warehouse = await warehouseRepository.getWarehouseByName(warehouseName)
            if (warehouse == undefined) throw new NotFoundError("Warehouse not found")
            
            let merchant = await userRepository.getUserById(product.merchantId)
            if (merchant == undefined) throw new NotFoundError("Marchand not found")

            let productDTO = ProductMap.toDTO(product)
            let merchantDTO = UserMap.toDTO(merchant)
            
            productDTO.accepted = true
            productDTO.acceptationDate = new Date()
            productDTO.warehouseId = warehouse.id

            if (merchantDTO.productSold == undefined) merchantDTO.productSold = new Array<IProductSold>()

            merchantDTO.productSold.push({
                productId: product.id,
                priceReceived: product.priceSeller,
                sellDate: new Date()
            })

            await warehouseRepository.updateStockProduct(ProductMap.toDomain(productDTO), warehouse.id)
            await productRepository.save(ProductMap.toDomain(productDTO))
            await userRepository.save(UserMap.toDomain(merchantDTO))

            paymentHanlder.emitPayment(product.priceSeller, merchant.id)
        } catch(error) {
            throw error
        }
    }
    
}