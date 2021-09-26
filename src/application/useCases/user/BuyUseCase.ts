import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IPromoCoinsRepository } from "../../interfaces/repository/IPromoCoinsRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../../interfaces/repository/IWarehouseRepository";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";
import { ProductMap } from "../../mappers/ProductMap";
import { UserMap } from "../../mappers/UserMap";
import { IBuyUseCase } from "./IBuyUseCase";
import { NotFoundError } from "../../errors/NotFoundError";

export class BuyUseCase implements IBuyUseCase {
    async execute(userId: string, itemBucket: any, paymentHandler: IPaymentHandler, userRepository: IUserRepository, 
        productRepository: IProductRepository, warehouseRepository: IWarehouseRepository, 
        promoCoinsRepository: IPromoCoinsRepository): Promise<string> {
        try {
            Guard.AgainstNullOrUndefined(userId, "User id is required")
            Guard.AgainstNullOrUndefined(itemBucket, "Bucket is required")

            let promoMultiplier = 1
            let currentDate = new Date()

            let user = await userRepository.getUserById(userId)
            if (user == undefined) throw new NotFoundError("User not found")

            let promotion = await promoCoinsRepository.getActivePromo(currentDate)
            if (promotion !=  undefined) promoMultiplier = promotion.multiplicateur

            let userDTO = UserMap.toDTO(user)
            let totalPrice = this.calculateBucketAmount(itemBucket)
            let secretKey = paymentHandler.acceptPayment(totalPrice)

            if (userDTO.greenCoins.expireDate != undefined) {
                if (currentDate.toISOString() === userDTO.greenCoins.expireDate.toISOString()) {
                    userDTO.greenCoins.amount = 0
                }
            }

            userDTO.greenCoins.amount += ((totalPrice % 10) * promoMultiplier)
            userDTO.greenCoins.expireDate = new Date(1, 1, currentDate.getFullYear() + 2)

            let itemsId = await this.updateProductStock(itemBucket, warehouseRepository, productRepository)
            userDTO.achats.push({
                amount: totalPrice,
                paymentDate: new Date(),
                itemsId: itemsId
            })

            await userRepository.save(UserMap.toDomain(userDTO))

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

    private async updateProductStock(itemsBucket: any, warehouseRepository: IWarehouseRepository, 
        productRepository: IProductRepository): Promise<Array<string>> {
        let itemsId = new Array<string>()
        for(var article of itemsBucket) {
            let product = await productRepository.getProductById(article.id)
            if (product != undefined) {
                itemsId.push(product.id)
                let productDTO = ProductMap.toDTO(product)
                productDTO.sold = true
                await productRepository.save(ProductMap.toDomain(productDTO))
                await warehouseRepository.updateStockProduct(product, product.warehouseId, article.quantity)
            } else {
                throw new NotFoundError("Product not found : " + article.id)
            }
        }
        return itemsId
    }
}