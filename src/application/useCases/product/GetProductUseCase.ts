import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { Product } from "../../../domain/entity/Product";
import { IGetProductUseCase } from "./IGetProductUseCase";
import { NotFoundError } from "../../errors/NotFoundError";

export class GetProductUseCase implements IGetProductUseCase {
    async execute(productId: string, productRepository: IProductRepository): Promise<Product> {
        let product = await productRepository.getProductById(productId)
        if(!product) throw new NotFoundError("Product doesn't exist !")

        return product

    }
    
}