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
import { IGeneratorIdHandler } from "../../interfaces/services/IGeneratorIdHandler";
import { IUserOrders } from "../../../domain/entityProperties/IUserOrders";

export class BuyUseCase implements IBuyUseCase {
    private _totalPrice: number = 0

    async execute(userId: string, itemBucket: any, paymentHandler: IPaymentHandler, idGenerator: IGeneratorIdHandler, userRepository: IUserRepository, 
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
            //let secretKey = paymentHandler.acceptPayment(this._totalPrice)

            // mettre cette partie dans le login pour update les greens coins quand le user se log
            if (userDTO.greenCoins.expireDate != undefined) {
                if (currentDate.toISOString() === userDTO.greenCoins.expireDate.toISOString()) {
                    userDTO.greenCoins.amount = 0
                }
            }

            userDTO.greenCoins.amount += ((this._totalPrice % 10) * promoMultiplier)
            userDTO.greenCoins.expireDate = new Date(1, 1, currentDate.getFullYear() + 2)

            let itemsId = await this.calculateTotalPrice(itemBucket, warehouseRepository, productRepository)
            let order: IUserOrders = {
                id: idGenerator.generate(),
                amount: this._totalPrice,
                paymentDate: new Date(),
                itemsId: itemsId
            }

            userDTO.orders.push(order)

            await userRepository.save(UserMap.toDomain(userDTO))

            return "Done"
        } catch(error) {
            throw error
        }
    }

    private async calculateTotalPrice(itemsBucket: any, warehouseRepository: IWarehouseRepository, 
        productRepository: IProductRepository): Promise<Array<string>> {
        let itemsId = new Array<string>()
        for(var id of itemsBucket) {
            let product = await productRepository.getProductById(id)
            if (product != undefined) {
                itemsId.push(product.productId)
                let productDTO = ProductMap.toDTO(product)
                productDTO.sold = true
                this._totalPrice += productDTO.price
                await productRepository.save(ProductMap.toDomain(productDTO))
                await warehouseRepository.updateStockProduct(product, true)
            } else {
                throw new NotFoundError("Product not found : " + id)
            }
        }
        return itemsId
    }
}