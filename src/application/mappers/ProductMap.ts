import { Product } from "../../domain/entity/Product"
import { IProductDTO } from "../DTOs/IProductDTO"

export class ProductMap {
    public static toDTO(product: Product): IProductDTO {
        return {
            id: product.id,
            name: product.name,
            category: product.category,
            brand: product.brand,
            model: product.model,
            specificities: product.specificities,
            state: product.state,
            status: product.status,
            price: product.price,
            priceSeller: product.priceSeller,
            images: product.images,
            merchantId: product.merchantId,
            warehouseId: product.warehouseId,
            accepted: product.accepted,
            weight: product.weight,
            creationDate: product.creationDate,
            acceptationDate: product.acceptationDate
        }
    }

    public static toDomain(product: any): Product {
        return Product.createProduct({
            name: product.name,
            category: product.category,
            brand: product.brand,
            model: product.model,
            specificities: product.specificities,
            price: product.price,
            priceSeller: product.priceSeller,
            state: product.state,
            status: product.status,
            images: product.images,
            merchantId: product.merchantId,
            warehouseId: product.warehouseId,
            accepted: product.accepted,
            weight: product.weight,
            creationDate: product.creationDate,
            acceptationDate: product.acceptationDate
        }, product.id)
    }

    public static allToDomain(products: any[]): Product[]{
        let list = []
        for(let product of products){
            list.push(this.toDomain(product))
        }
        return list
    }

    public static toPersistence(product: Product): any {
        return {
            name: product.name,
            category: product.category,
            brand: product.brand,
            model: product.model,
            specificities: product.specificities,
            state: product.state,
            status: product.status,
            price: product.price,
            priceSeller: product.priceSeller,
            images: product.images,
            merchantId: product.merchantId,
            warehouseId: product.warehouseId,
            accepted: product.accepted,
            weight: product.weight,
            creationDate: product.creationDate,
            acceptationDate: product.acceptationDate
        }
    }
}