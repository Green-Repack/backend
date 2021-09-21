import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";
import { ProductMap } from "../../mappers/ProductMap";
import { IBuyUseCase } from "./IBuyUseCase";

export class BuyUseCase implements IBuyUseCase {
    async execute(userId: string, itemBucket: any, paymentHandler: IPaymentHandler, userRepository: IUserRepository, 
        productRepository: IProductRepository, warehouseRepository: IWarehouseRepository): Promise<string> {
        try {
            Guard.AgainstNullOrUndefined(userId, "User id is required")

            let user = await userRepository.getUserById(userId)
            if (user == undefined) throw new NotFoundError("User not found")

            let totalPrice = this.calculateBucketAmount(itemBucket)
            let secretKey = paymentHandler.acceptPayment(totalPrice)

            await this.updateProductStock(itemBucket, warehouseRepository, productRepository)
            
            return secretKey
        } catch(error) {
            throw error
        }
    }

    private calculateBucketAmount(itemsBucket: any): number {
        let total: number = 0
        for(var article of itemsBucket) {
            total += (article.price * article.quantity)
        }
        return total
    }

    private async updateProductStock(itemsBucket: any, warehouseRepository: IWarehouseRepository, productRepository: IProductRepository): Promise<void> {
        for(var article of itemsBucket) {
            let product = await productRepository.getProductById(article.id)
            if (product != undefined) {
                let productDTO = ProductMap.toDTO(product)
                productDTO.sold = true
                await productRepository.save(ProductMap.toDomain(productDTO))
                await warehouseRepository.updateStockProduct(product, product.warehouseId, article.quantity)
            } else {
                throw new NotFoundError("The product does not exist : " + article.id)
            }
        }
    }
}