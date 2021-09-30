import { IProductPriceRepository } from "../../../application/interfaces/repository/IProductPriceRepository";
import {ProductPriceMap} from "../../../application/mappers/ProductPriceMap";
import { ProductPrice } from "../../../domain/entity/ProductPrice";
import { IProductPriceProps } from "../../../domain/entityProperties/IProductPriceProps";
import {ProductPriceModel} from "../schemas/ProductPrice";
import { injectable } from "inversify";

@injectable()
export class ProductPriceRepository implements IProductPriceRepository{
    async getByCategory(category: string): Promise<ProductPrice[]> {
        let result: Array<ProductPrice> = new Array<ProductPrice>();
        let productPrices = await ProductPriceModel.find({productCategory: category})
        if(productPrices){
            for(let prodPrice of productPrices){
                result.push(ProductPriceMap.toDomain(prodPrice));
            }
            return result
        }
        return []
    }

    async getByCategoryAndState(category: string, state: string): Promise<ProductPrice | null> {
        let productPrice = await ProductPriceModel.findOne({productCategory: category, productState: state})
        if(productPrice) return ProductPriceMap.toDomain(productPrice);
        return null
    }

    async delete(t: ProductPrice): Promise<void> {
        await ProductPriceModel.findByIdAndDelete(t.id)
    }

    async exists(id: string): Promise<boolean> {
        let priceProduct = await ProductPriceModel.findById(id);
        if(priceProduct) return true
        return false
    }

    async save(t: IProductPriceProps): Promise<void> {
        return Promise.resolve(undefined);
    }

}
