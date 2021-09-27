import { injectable } from "inversify";
import { IProductRepository } from "../../../application/interfaces/repository/IProductRepository";
import { ProductMap } from "../../../application/mappers/ProductMap";
import { Product } from "../../../domain/entity/Product";
import { ProductModel } from "../schemas/Product";

@injectable()
export class ProductRepository implements IProductRepository {
    async getProductById(id: string): Promise<Product | undefined> {
        let product = await ProductModel.findById(id)
        if (product) return ProductMap.toDomain(product)
        else return undefined
    }

    async getProductSellsNumber(category: string, brand: string, model: string): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async getAllProducts(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }

    async exists(id: string): Promise<boolean> {
        try {
            let idResult = await ProductModel.findById(id)
            if (idResult == null)  return false
            else return true
        } catch(error) {
            return false
        }
    }

    async delete(product: Product): Promise<void> {
        await ProductModel.findByIdAndDelete(product.id)
    }

    async save(product: Product): Promise<void> {
        let exists = await this.exists(product.id)
        const rawUserData = ProductMap.toPersistence(product)

        if (exists) {
            const mongooseUser = await ProductModel.findById(product.id)
            if (mongooseUser) await mongooseUser.updateOne(rawUserData)
        } else {
            await ProductModel.create(rawUserData)
        }
    }
}