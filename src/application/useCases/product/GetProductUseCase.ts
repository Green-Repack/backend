import { IProductDTO } from "../../DTOs/IProductDTO"
import { IProductRepository } from "../../interfaces/repository/IProductRepository"
import { ProductMap } from "../../mappers/ProductMap"
import { IGetProductUseCase } from "./IGetProductUseCase"
import { NotFoundError } from "../../errors/NotFoundError"

export class GetProductUseCase implements IGetProductUseCase {
    async execute(productId: string, productRepository: IProductRepository): Promise<IProductDTO> {
        try {
            let product = await productRepository.getProductById(productId)
            if(!product) throw new NotFoundError("Product not found")

            return ProductMap.toDTO(product)
        } catch(error) {
            throw error
        }
    }
}