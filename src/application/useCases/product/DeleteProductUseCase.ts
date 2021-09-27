
import { NotFoundError } from "../../errors/NotFoundError";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IDeleteProductUseCase } from "./IDeleteProductUseCase";

export class DeleteProductUseCase implements IDeleteProductUseCase {
    async execute(productId: string, productRepository: IProductRepository, userId: string, admin: boolean): Promise<void> {
        let product = await productRepository.getProductById(productId)
        if(!product) throw new NotFoundError("Product doesn't exist !")

        if(userId!=product.merchantId && !admin) throw new UnauthorizedError("You are not authorized to delete this product")

        await productRepository.delete(product)
    }
    
}