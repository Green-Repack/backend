import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IGetSellsNumberUseCase } from "./IGetSellsNumberUseCase";

export class GetSellsNumberUseCase implements IGetSellsNumberUseCase {
    async execute(productInfo: any, productRepository: IProductRepository): Promise<number> {
        try {
            Guard.AgainstNullOrUndefined(productInfo.category, "categry required")
            Guard.AgainstNullOrUndefined(productInfo.brand, "brand required")
            Guard.AgainstNullOrUndefined(productInfo.model, "model required")

            let sellsNUmber = await productRepository.getProductSellsNumber(productInfo.category, productInfo.brand, productInfo.model)
            return sellsNUmber
        } catch(error) {
            throw error
        }
    }

}