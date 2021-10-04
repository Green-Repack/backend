import { EProductCategory } from "../../../domain/entityProperties/EProductCategory"
import { IProductDTO } from "../../DTOs/IProductDTO"
import { IProductRepository } from "../../interfaces/repository/IProductRepository"
import { ProductMap } from "../../mappers/ProductMap"
import { IGetPoductForValidationUseCase } from "./IGetProductForValidationUseCase"

export class GetProductForValidationUseCase implements IGetPoductForValidationUseCase {
    async execute(productRepository: IProductRepository): Promise<IProductDTO[]> {
        try {
            let products = await productRepository.getProductForValidation()
            let productsDTO: IProductDTO[] = new Array<IProductDTO>()
            for (var product of products) {
                productsDTO.push(ProductMap.toDTO(product))
            }
            return productsDTO
        } catch (error) {
            throw error
        }
    }

}