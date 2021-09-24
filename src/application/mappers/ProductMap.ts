import { Product } from "../../domain/entity/Product"
import { IProduitDTO } from "../DTOs/IProduitDTO"

export class ProductMap {
    public static toDTO(product: Product): IProduitDTO {
        return {
            id: product.id,
            name: product.name,
            category: product.category,
            brand: product.brand,
            model: product.model,
            specificities: product.specificities,
            price: product.price,
            priceSeller: product.priceSeller,
            images: product.images,
            merchantId: product.merchantId,
            warehouseId: product.warehouseId,
            accepted: product.accepted,
            sold: product.isSold(),
            creationDate: product.creationDate,
            acceptationDate: product.acceptationDate
        }
    }

    public static toDomain(product: any): Product {
        return product.createEntrepot({
            name: product.name,
            category: product.category,
            brand: product.brand,
            model: product.model,
            specificities: product.specificities,
            price: product.price,
            priceSeller: product.priceSeller,
            images: product.images,
            merchantId: product.merchantId,
            warehouseId: product.warehouseId,
            accepted: product.accepted,
            sold: product.isSold(),
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
            price: product.price,
            priceSeller: product.priceSeller,
            images: product.images,
            merchantId: product.merchantId,
            warehouseId: product.warehouseId,
            accepted: product.accepted,
            sold: product.isSold(),
            creationDate: product.creationDate,
            acceptationDate: product.acceptationDate
        }
    }
}