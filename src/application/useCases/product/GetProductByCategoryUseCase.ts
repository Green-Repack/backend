import { EProductCategory } from "../../../domain/entityProperties/EProductCategory";
import { Guard } from "../../commons/Guard";
import { IProductDTO } from "../../DTOs/IProductDTO";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { ProductMap } from "../../mappers/ProductMap";
import { IGetProductByCategoryUseCase } from "./IGetProductByCategoryUseCase";

export class GetProductByCategoryUseCase implements IGetProductByCategoryUseCase {
    async execute(category: string, productRepository: IProductRepository): Promise<IProductDTO[]> {
        try {
            Guard.AgainstNullOrUndefined(category, "Category is required")
            
            let categoryName: EProductCategory = category as EProductCategory
            let products = await productRepository.getProductByCategory(categoryName)
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