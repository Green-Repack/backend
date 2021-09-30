import { EProductCategory } from "../../../domain/entityProperties/EProductCategory";
import { Guard } from "../../commons/Guard";
import { IProductDTO } from "../../DTOs/IProductDTO";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { ProductMap } from "../../mappers/ProductMap";
import { IGetProductByBrandUseCase } from "./IGetProductByBrandUseCase";

export class GetProductByBrandUseCase implements IGetProductByBrandUseCase {
    async execute(category: string, brand: string, productRepository: IProductRepository): Promise<IProductDTO[]> {
        try {
            Guard.AgainstNullOrUndefined(category, "Category is required")
            Guard.AgainstNullOrUndefined(brand, "Brand is required")
            
            let categoryName: EProductCategory = category as EProductCategory
            let products = await productRepository.getProductByBrand(categoryName, brand)
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