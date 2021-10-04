import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";
import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { ProductMap } from "../../mappers/ProductMap";
import { IRefuseEstimationUseCase } from "./IRefuseEstimationUseCase";
import { NotFoundError } from "../../errors/NotFoundError";
import { UserRepository } from "../../../infrastructure/persistence/repositories/UserRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { UserMap } from "../../mappers/UserMap";

export class RefuseEstimationUseCase implements IRefuseEstimationUseCase {
    async execute(productId: string, userRepository: IUserRepository, productRepository: IProductRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")

            let merchant = await userRepository.getUserById(product.merchantId)
            if (merchant == undefined) throw new NotFoundError("Merchant not found")

            let productDTO = ProductMap.toDTO(product)
            let merchatDTO = UserMap.toDTO(merchant)

            if (productDTO.sellingStatus == EPurchasePromiseStatus.Estimtated) {
                productDTO.sellingStatus = EPurchasePromiseStatus.EstimationDeclined

                await userRepository.updateProductSoldStatus(merchatDTO.email, productDTO.productId, productDTO.sellingStatus)
                await productRepository.save(ProductMap.toDomain(productDTO))
            }
        } catch(error) {
            throw(error)
        }
    }   
}