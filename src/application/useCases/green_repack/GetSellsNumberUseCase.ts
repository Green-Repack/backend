import { EProductCategory } from "../../../domain/entityProperties/EProductCategory";
import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IGetSellsNumberUseCase } from "./IGetSellsNumberUseCase";

export class GetSellsNumberUseCase implements IGetSellsNumberUseCase {
    async execute(productInfo: any, productRepository: IProductRepository): Promise<number> {
        try {
            Guard.AgainstNullOrUndefined(productInfo.category, "category required")
            Guard.AgainstNullOrUndefined(productInfo.brand, "brand required")
            Guard.AgainstNullOrUndefined(productInfo.model, "model required")
            Guard.AgainstNullOrUndefined(productInfo.year, "year required")

            let category = productInfo.category as EProductCategory
            let sellsNUmber = await productRepository.getProductSellsNumber(category, productInfo.brand, productInfo.model, productInfo.year)
            return sellsNUmber
        } catch(error) {
            throw error
        }
    }

}