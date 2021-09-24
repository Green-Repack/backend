import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { ProductMap } from "../../mappers/ProductMap";
import { IRefuseEstimationUseCase } from "./IRefuseEstimationUseCase";

export class RefuseEstimationUseCase implements IRefuseEstimationUseCase {
    async execute(productId: string, productRepository: IProductRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(productId, "Product id is required")

            let product = await productRepository.getProductById(productId)
            if (product == undefined) throw new NotFoundError("Product not found")

            let productDTO = ProductMap.toDTO(product)

            productDTO.accepted = false
            productDTO.acceptationDate = new Date()
            productDTO.priceSeller = 0
            
            await productRepository.save(ProductMap.toDomain(productDTO))
        } catch(error) {
            throw error
        }
    }   
}