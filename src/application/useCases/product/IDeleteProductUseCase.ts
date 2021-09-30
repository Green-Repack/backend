  import { IProductRepository } from "../../interfaces/repository/IProductRepository";

export interface IDeleteProductUseCase {
    execute(productId: string, productRepository: IProductRepository): Promise<void>
}