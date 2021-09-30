import { IProductDTO } from "../../DTOs/IProductDTO"
import { IProductRepository } from "../../interfaces/repository/IProductRepository"
import { ProductMap } from "../../mappers/ProductMap"
import { IGetProductUseCase } from "./IGetProductUseCase"

export class GetProductUseCase implements IGetProductUseCase {
    async execute(productId: string, productRepository: IProductRepository): Promise<IProductDTO> {
        let product = await productRepository.getProductById(productId)
        if(!product) throw new NotFoundError("Product not found")

        return ProductMap.toDTO(product)
    }
}