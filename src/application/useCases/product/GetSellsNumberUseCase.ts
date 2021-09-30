import { EProductCategory } from "../../../domain/entityProperties/EProductCategory";
import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IGetSellsNumberUseCase } from "./IGetSellsNumberUseCase";

export class GetSellsNumberUseCase implements IGetSellsNumberUseCase {
    async execute(category: string, brand: string, model: string, year: number, productRepository: IProductRepository): Promise<number> {
        try {
            Guard.AgainstNullOrUndefined(category, "category required")
            Guard.AgainstNullOrUndefined(brand, "brand required")
            Guard.AgainstNullOrUndefined(model, "model required")
            Guard.AgainstNullOrUndefined(year, "year required")
            
            let categoryEnum = category as EProductCategory
            
            let sellsNUmber = await productRepository.getProductSellsNumber(categoryEnum, brand, model, year)
            return sellsNUmber
        } catch(error) {
            throw error
        }
    }

}