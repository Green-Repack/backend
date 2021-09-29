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
import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";

export class AcceptProductUseCase implements IAcceptProductUseCase {
    async execute(productId: string, warehouseName: string, paymentHanlder: IPaymentHandler, userRepository: IUserRepository,
         productRepository: IProductRepository, warehouseRepository: IWarehouseRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")
            
            let warehouse = await warehouseRepository.getWarehouseByName(warehouseName)
            if (warehouse == undefined) throw new NotFoundError("Warehouse not found")
            
            let marchand = await userRepository.getUserById(product.merchantId)
            if (marchand == undefined) throw new NotFoundError("Merchant not found")
            
            let productDTO = ProductMap.toDTO(product)
            let marchandDTO = UserMap.toDTO(marchand)

            if (productDTO.sellingStatus != EPurchasePromiseStatus.EstimationDeclined) {
                productDTO.sellingStatus = EPurchasePromiseStatus.Accepted
                productDTO.warehouseId = warehouse.id

                if (marchandDTO.productSold == undefined) marchandDTO.productSold = new Array<IProductSold>()

                marchandDTO.productSold.push({
                    productId: product.productId,
                    priceReceived: product.priceSeller,
                    sellDate: new Date()
                })

                await warehouseRepository.updateStockProduct(ProductMap.toDomain(productDTO), false)
                await productRepository.save(ProductMap.toDomain(productDTO))
                await userRepository.save(UserMap.toDomain(marchandDTO))
            }

            //paymentHanlder.emitPayment(product.priceSeller, marchand.id) emission du virement à l'utilisateur
        } catch(error) {
            throw(error)
        }
    }
    
}