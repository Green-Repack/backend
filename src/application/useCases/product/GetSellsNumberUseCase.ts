import { EProductCategory } from "../../../domain/entityProperties/EProductCategory";
import { Guard } from "../../commons/Guard";
import { IProductRepository } from "../../interfaces/repository/IProductRepository";
import { IGetSellsNumberUseCase } from "./IGetSellsNumberUseCase";

export class GetSellsNumberUseCase implements IGetSellsNumberUseCase {
    async execute(category: string, productRepository: IProductRepository): Promise<{[token: string]: number}> {
        try {
            Guard.AgainstNullOrUndefined(category, "category required")
            
            let categoryEnum = category as EProductCategory
            
            let productSold = await productRepository.getProductSellsNumber(categoryEnum)
            let numberSold = productSold.length
            let amountEuros = 0
            for(var product of productSold) {
                amountEuros += product.price
            }
            return {numberSold: numberSold, totalAmount: amountEuros}
        } catch(error) {
            throw error
        }
    }

}