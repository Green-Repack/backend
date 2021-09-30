import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { ProductMap } from "../../mappers/ProductMap";
import { IRefuseProductUseCase } from "./IRefuseProductUseCase";
import { NotFoundError } from "../../errors/NotFoundError";
import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";

export class RefuseProductUseCase implements IRefuseProductUseCase {
    async execute(productId: string, userRepository: IUserRepository, productRepository: IProductRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")

            let merchant = await userRepository.getUserById(product.merchantId)
            if (merchant == undefined) throw new NotFoundError("Marchand not found")

            let productDTO = ProductMap.toDTO(product)
            if (productDTO.sellingStatus == EPurchasePromiseStatus.WaitingForApproval) {
                productDTO.sellingStatus = EPurchasePromiseStatus.Declined
                
                await userRepository.updateProductSoldStatus(merchant.email, productId, productDTO.sellingStatus)
                await productRepository.save(ProductMap.toDomain(productDTO))
            }
        } catch(error) {
            throw(error)
        }
    }
    
}