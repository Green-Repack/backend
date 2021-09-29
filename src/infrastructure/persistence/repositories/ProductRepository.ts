import { injectable } from "inversify";
import { IProductRepository } from "../../../application/interfaces/repository/IProductRepository";
import { ProductMap } from "../../../application/mappers/ProductMap";
import { Product } from "../../../domain/entity/Product";
import { EProductCategory } from "../../../domain/entityProperties/EProductCategory";
import { ProductModel } from "../schemas/Product";

@injectable()
export class ProductRepository implements IProductRepository {
    async getProductByCategory(category: EProductCategory): Promise<Product[]> {
        let result: Product[] = new Array<Product>()
        let products = await ProductModel.find({category: category})
        for(var product of products) {
            result.push(ProductMap.toDomain(product))
        }
        return result
    }

    async getProductByBrand(category: EProductCategory, brand: string): Promise<Product[]> {
        let result: Product[] = new Array<Product>()
        let products = await ProductModel.find({category: category, brand: brand})
        for(var product of products) {
            result.push(ProductMap.toDomain(product))
        }
        return result
    }

    async getProductById(id: string): Promise<Product | undefined> {
        let product = await ProductModel.findOne({productId: id})
        if (product) return ProductMap.toDomain(product)
        else return undefined
    }

    async getProductSellsNumber(category: EProductCategory, brand: string, model: string, year: number): Promise<number> {
        let productsSold = await ProductModel.find(
            { category: category, brand: brand, model: model, year: year, sold: true}).count()
        return productsSold
    }

    async getAllProducts(): Promise<Product[]> {
        let result: Product[] = new Array<Product>()
        let products = await ProductModel.find({})
        for(var product of products) {
            result.push(ProductMap.toDomain(product))
        }
        return result
    }

    async exists(id: string): Promise<boolean> {
        try {
            let idResult = await ProductModel.findOne({productId: id})
            if (idResult == null)  return false
            else return true
        } catch(error) {
            return false
        }
    }

    async delete(product: Product): Promise<void> {
        await ProductModel.findOneAndDelete({productId: product.productId})
    }

    async save(product: Product): Promise<void> {
        let exists = await this.exists(product.productId)
        const rawUserData = ProductMap.toPersistence(product)

        if (exists) {
            const mongooseUser = await ProductModel.findOne({productId: product.productId})
            if (mongooseUser) await mongooseUser.updateOne(rawUserData)
        } else {
            await ProductModel.create(rawUserData)
        }
    }
}