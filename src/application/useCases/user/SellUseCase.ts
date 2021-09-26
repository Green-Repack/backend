import { Guard } from "../../commons/Guard";
import { IProductDTO } from "../../DTOs/IProductDTO";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { ProductMap } from "../../mappers/ProductMap";
import { ISellUseCase } from "./ISellUseCase";
import { NotFoundError } from "../../errors/NotFoundError";

export class SellUseCase implements ISellUseCase {
    async execute(userId: string, productInfo: any, userRepository: IUserRepository, productRepository: IProductRepository): Promise<number> {
        try{
            Guard.AgainstNullOrUndefined(userId, "User id is required")
            Guard.AgainstNullOrUndefined(productInfo.name, "Name is required")
            Guard.AgainstNullOrUndefined(productInfo.category, "Mategory is required")
            Guard.AgainstNullOrUndefined(productInfo.model, "Model is required")

            let user = await userRepository.getUserById(userId)
            if (user == undefined) throw new NotFoundError("User not found")

            let estimatePrice = 1233 //TODO estimer du produit en fonction du produit

            let productDTO: IProductDTO = {
                name: productInfo.name,
                category: productInfo.category,
                brand: productInfo.brand,
                model: productInfo.model,
                specificities: productInfo.specificities,
                images: productInfo.images,
                merchantId: user.id,
                priceSeller: estimatePrice,
                sold: false,
                creationDate: new Date()
            }

            await productRepository.save(ProductMap.toDomain(productDTO))
            
            return 123 // retourner le prix estimé au marchand
        } catch(error) {
            throw error
        }
    }
}