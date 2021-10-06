import { IProductRepository } from "../../interfaces/repository/IProductRepository"
import { IDeleteProductUseCase } from "./IDeleteProductUseCase"
import { NotFoundError } from "../../errors/NotFoundError"

export class DeleteProductUseCase implements IDeleteProductUseCase {
    async execute(productId: string, productRepository: IProductRepository): Promise<void> {
        try {
            let product = await productRepository.getProductById(productId)
            if(!product) throw new NotFoundError("Product not found")

            await productRepository.delete(product)
        } catch(error) {
            throw error
        }
    }   
}