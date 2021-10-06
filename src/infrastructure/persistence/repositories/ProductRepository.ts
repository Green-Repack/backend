import { injectable } from "inversify";
import { IProductRepository } from "../../../application/interfaces/repository/IProductRepository";
import { ProductMap } from "../../../application/mappers/ProductMap";
import { Product } from "../../../domain/entity/Product";
import { EProductCategory } from "../../../domain/entityProperties/EProductCategory";
import { EPurchasePromiseStatus } from "../../../domain/entityProperties/EPurchasePromiseStatus";
import { ProductModel } from "../schemas/Product";

@injectable()
export class ProductRepository implements IProductRepository {
    async getProductByStripId(id: string): Promise<Product> {
        let product = await ProductModel.findOne({stripeProductId: id})
        if (product) return ProductMap.toDomain(product)
        else return undefined
    }

    async getProductForValidation(): Promise<Product[]> {
        let result: Product[] = new Array<Product>()
        let products = await ProductModel.find({$or : [{sellingStatus: EPurchasePromiseStatus.Estimtated}, 
                                            {sellingStatus: EPurchasePromiseStatus.WaitingForApproval},
                                            {sellingStatus: EPurchasePromiseStatus.WaitingForCounterOfferApproval}]})
        for(var product of products) {
            result.push(ProductMap.toDomain(product))
        }
        return result
    }

    async getProductByCategory(category: EProductCategory): Promise<Product[]> {
        let result: Product[] = new Array<Product>()
        let products = await ProductModel.find({category: category, sold: false, sellingStatus: EPurchasePromiseStatus.Accepted})
        for(var product of products) {
            result.push(ProductMap.toDomain(product))
        }
        return result
    }

    async getProductByBrand(category: EProductCategory, brand: string): Promise<Product[]> {
        let result: Product[] = new Array<Product>()
        let products = await ProductModel.find({category: category, brand: brand.toLowerCase(), 
            sold: false, sellingStatus: EPurchasePromiseStatus.Accepted})
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

    async getProductSellsNumber(category: EProductCategory, brand: string, model: string, year: number): Promise<Product[]> {
        let result: Product[] = new Array<Product>()
        let productsSold = await ProductModel.find(
            { category: category, brand: brand.toLowerCase(), model: model.toLowerCase(), year: year, sold: true})
        for(var product of productsSold) {
            result.push(ProductMap.toDomain(product))
        }
        return result
    }

    async getAllProducts(): Promise<Product[]> {
        let result: Product[] = new Array<Product>()
        let products = await ProductModel.find({sold: false, sellingStatus: EPurchasePromiseStatus.Accepted})
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