import {Product} from "../../../domain/entity/Product";
import {IProductRepository} from "../../../domain/interface/product/IProductRepository";
import {ProductModel} from "../schemas/Product";

export class ProductRepository implements IProductRepository{
    async delete(id: string): Promise<void> {
        return undefined;
    }

    async exists(id: string): Promise<boolean> {
        let product = await ProductModel.findById(id);
        return !!product;

    }

    async getAllProducts(): Promise<Product[]> {
        let products = await ProductModel.find({});
        if(products) return products;
        return []
    }

    async getProductByCategory(category: string): Promise<Product[]> {
        let products = await ProductModel.find({category: category});
        if(products) return products;
        return []
    }

    async getProductById(productId: string): Promise<Product | null> {
        let product = await ProductModel.findById(productId);
        if(product) return product;
        return null
    }

    async getProductByMerchant(merchantId: string): Promise<Product[]> {
        let products = await ProductModel.find({creatorId: merchantId});
        if(products) return products;
        return []
    }

    async save(t: Product): Promise<void> {
        return undefined;
    }

    async getProductByFilter(filter: any): Promise<Product[]> {
        let products = await ProductModel.find(filter);
        if(products) return products;
        return []
    }

}
