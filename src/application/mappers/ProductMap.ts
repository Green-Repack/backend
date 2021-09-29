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
            sellingStatus: product.sellingStatus,
            state: product.state,
            specificities: product.specificities,
            price: product.price,
            priceSeller: product.priceSeller,
            images: product.images,
            merchantId: product.merchantId,
            warehouseId: product.warehouseId,
            sold: product.isSold(),
            creationDate: product.creationDate,
            weight: product.weight,
            year: product.year
        }
    }

    public static toDomain(product: any): Product {
        return Product.createProduct({
            name: product.name,
            category: product.category,
            brand: product.brand,
            model: product.model,
            sellingStatus: product.sellingStatus,
            state: product.state,
            specificities: product.specificities,
            price: product.price,
            priceSeller: product.priceSeller,
            images: product.images,
            merchantId: product.merchantId,
            warehouseId: product.warehouseId,
            sold: product.sold,
            creationDate: product.creationDate,
            weight: product.weight,
            year: product.year
        }, product.id)
    }

    public static toPersistence(product: Product): any {
        return {
            name: product.name,
            category: product.category,
            brand: product.brand,
            model: product.model,
            sellingStatus: product.sellingStatus,
            state: product.state,
            specificities: product.specificities,
            price: product.price,
            priceSeller: product.priceSeller,
            images: product.images,
            merchantId: product.merchantId,
            warehouseId: product.warehouseId,
            sold: product.isSold(),
            creationDate: product.creationDate,
            weight: product.weight,
            year: product.year
        }
    }
}