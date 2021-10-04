import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IStripeHandler } from "../../interfaces/services/IStripeHandler";
import { UserMap } from "../../mappers/UserMap";
import { IBuyUseCase } from "./IBuyUseCase";
import { NotFoundError } from "../../errors/NotFoundError";

export class BuyUseCase implements IBuyUseCase {
    async execute(userId: string, productId: string, stripeHandler: IStripeHandler, userRepository: IUserRepository, 
        productRepository: IProductRepository): Promise<{[token: string]: string}> {
        try {
            Guard.AgainstNullOrUndefined(userId, "User id is required")
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let user = await userRepository.getUserById(userId)
            if (user == undefined) throw new NotFoundError("User not found")

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")

            let userDTO = UserMap.toDTO(user)
            let secretKey = await stripeHandler.generatePaymentIntentBuy(userDTO, "achat",product.productId, product.price)

            return {client_secret: secretKey}
        } catch(error) {
            throw error
        }
    }
}