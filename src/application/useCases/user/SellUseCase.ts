import { Guard } from "../../commons/Guard";
import { IProductDTO } from "../../DTOs/IProductDTO";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { ProductMap } from "../../mappers/ProductMap";
import { ISellUseCase } from "./ISellUseCase";
import { NotFoundError } from "../../errors/NotFoundError";
import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";
import { IGeneratorIdHandler } from "../../interfaces/services/IGeneratorIdHandler";
import { UserMap } from "../../mappers/UserMap";
import { IProductSold } from "../../../domain/entityProperties/IProductSold";

export class SellUseCase implements ISellUseCase {
    async execute(userId: string, productInfo: any, idGenerator: IGeneratorIdHandler, 
        userRepository: IUserRepository, productRepository: IProductRepository): Promise<{[token: string]: string}> {
        try{
            Guard.AgainstNullOrUndefined(userId, "User id is required")
            Guard.AgainstNullOrUndefined(productInfo.name, "Name is required")
            Guard.AgainstNullOrUndefined(productInfo.category, "Category is required")
            Guard.AgainstNullOrUndefined(productInfo.brand, "Brand is required")
            Guard.AgainstNullOrUndefined(productInfo.model, "Model is required")
            Guard.AgainstNullOrUndefined(productInfo.year, "Year is required")
            Guard.AgainstNullOrUndefined(productInfo.state, "State is required")
            Guard.AgainstNullOrUndefined(productInfo.specificities, "Specificities are required")
            Guard.AgainstNullOrUndefined(productInfo.images, "Images are required")
            Guard.AgainstNullOrUndefined(productInfo.weight, "Weight is required")

            let user = await userRepository.getUserById(userId)
            if (user == undefined) throw new NotFoundError("User not found")

            let merchantDTO = UserMap.toDTO(user)
            let estimatePrice = 1233 //TODO estimer du produit en fonction du produit

            let productId = idGenerator.generate()
            let productDTO: IProductDTO = {
                productId: productId,
                name: productInfo.name,
                category: productInfo.category,
                brand: productInfo.brand,
                model: productInfo.model,
                sellingStatus: EPurchasePromiseStatus.Estimtated,
                state: productInfo.state,
                specificities: productInfo.specificities,
                images: productInfo.images,
                merchantId: user.id,
                priceSeller: estimatePrice,
                sold: false,
                creationDate: new Date(),
                weight: productInfo.weight,
                year: productInfo.year
            }

            if (merchantDTO.productSold == undefined) merchantDTO.productSold = new Array<IProductSold>()
            
            merchantDTO.productSold.push({
                productId: productDTO.productId,
                sellStatus: productDTO.sellingStatus
            })

            await productRepository.save(ProductMap.toDomain(productDTO))
            await userRepository.save(UserMap.toDomain(merchantDTO))
            
            return {estimation: estimatePrice.toString(), id: productId} // retourner le prix estimé au marchand
        } catch(error) {
            throw new Error(error.message)
        }
    }
}