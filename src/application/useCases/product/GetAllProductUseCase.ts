import { IProductDTO } from "../../DTOs/IProductDTO";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { ProductMap } from "../../mappers/ProductMap";
import { IGetAllProductUseCase } from "./IGetAllProductUseCase";

export class GetAllProductUseCase implements IGetAllProductUseCase {
    async execute(productRepository: IProductRepository): Promise<IProductDTO[]> {
        try {
            let products = await productRepository.getAllProducts()
            let productsDTO: IProductDTO[] = new Array<IProductDTO>()
            for (var product of products) {
                productsDTO.push(ProductMap.toDTO(product))
            }
            return productsDTO
        } catch(error) {
            throw error
        }
    }

}