import { ProductMap } from "../../../application/mappers/ProductMap";
import {Product} from "../../../domain/entity/Product";
import {IProductRepository} from "../../../application/interfaces/repository/IProductRepository";
import {ProductModel} from "../schemas/Product";
import { ProductCategory } from "../../../application/user/enum/ProductCategory";
import { injectable } from "inversify";

@injectable()
export class ProductRepository implements IProductRepository{
    async delete(t: Product): Promise<void> {
        await ProductModel.findByIdAndDelete(t.id);
    }

    async exists(id: string): Promise<boolean> {
        let product = await ProductModel.findById(id);
        return !!product;
    }

    async getAllProducts(): Promise<Product[]> {
        let products = await ProductModel.find({});
        if(products) return ProductMap.allToDomain(products);
        return []
    }

    async getProductByCategory(category: string): Promise<Product[]> {
        if(!ProductCategory[category]) return []
        let products = await ProductModel.find({ category: ProductCategory[category] });
        if(products) return ProductMap.allToDomain(products);
        return []
    }

    async getProductById(productId: string): Promise<Product | null> {
        let product = await ProductModel.findById(productId);
        if(product) return ProductMap.toDomain(product);
        return null
    }

    async getProductByMerchant(merchantId: string): Promise<Product[]> {
        let products = await ProductModel.find({creatorId: merchantId});
        if(products) return ProductMap.allToDomain(products);
        return []
    }

    async save(t: Product): Promise<void> {
        let exists = await this.exists(t.id)
        const rawProductData = ProductMap.toPersistence(t)

        if (exists) {
            const mongooseProduct = await ProductModel.findById(t.id)
            if (mongooseProduct) await mongooseProduct.updateOne(rawProductData)
        } else {
            await ProductModel.create(rawProductData)
        }
    }

    async getProductByFilter(filter: any): Promise<Product[]> {
        let products = await ProductModel.find(filter);
        if(products) return ProductMap.allToDomain(products);
        return []
    }


    async getProductSellsNumber(category: string, brand: string, model: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
}
