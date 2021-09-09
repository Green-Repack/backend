import {IProductPriceRepository} from "../../../domain/interface/product/productData/IProductPriceRepository";
import {IProductPriceProps} from "../../../domain/interface/product/productData/IProductPriceProps";
import {ProductPriceModel} from "../schemas/ProductPrice";

export class ProductPriceRepository implements IProductPriceRepository{
    async getByCategory(category: string): Promise<IProductPriceProps[]> {
        let productPrices = await ProductPriceModel.find({productCategory: category})
        if(productPrices) return productPrices
        return []
    }

    async getByCategoryAndState(category: string, state: string): Promise<IProductPriceProps | null> {
        let productPrice = await ProductPriceModel.findOne({productCategory: category, productState: state})
        if(productPrice) return productPrice
        return null
    }

    delete(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    exists(idOrEmail: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    save(t: IProductPriceProps): Promise<void> {
        return Promise.resolve(undefined);
    }

}