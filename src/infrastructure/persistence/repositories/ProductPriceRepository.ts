import { IProductPriceRepository } from "../../../application/interfaces/repository/IProductPriceRepository";
import { ProductPrice } from "../../../domain/entity/ProductPrice";
import { IProductPriceProps } from "../../../domain/entityProperties/IProductPriceProps";
import {ProductPriceModel} from "../schemas/ProductPrice";
import { injectable } from "inversify";

@injectable()
export class ProductPriceRepository implements IProductPriceRepository{
    async getByCategory(category: string): Promise<IProductPriceProps[]> {
        let productPrices = await ProductPriceModel.find({productCategory: category})
        if(productPrices) return productPrices
        return []
    }

    async getByCategoryAndState(category: string, state: string): Promise<IProductPriceProps | null> {
        let productPrice = await ProductPriceModel.findOne({productCategory: category, productState: state})
        if(productPrice) return productPrice;
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
