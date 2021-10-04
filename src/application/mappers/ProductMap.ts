import { Product } from "../../domain/entity/Product"
import { IProductDTO } from "../DTOs/IProductDTO"

export class ProductMap {
    public static toDTO(product: Product): IProductDTO {
        return {
            productId: product.productId,
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
            stripeProductId: product.stripeProductId,
            sold: product.isSold(),
            creationDate: product.creationDate,
            weight: product.weight,
            year: product.year
        }
    }

    public static toDomain(product: any): Product {
        return Product.createProduct({
            productId: product.productId,
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
            stripeProductId: product.stripeProductId,
            sold: product.sold,
            creationDate: product.creationDate,
            weight: product.weight,
            year: product.year
        }, product.productId)
    }

    public static toPersistence(product: Product): any {
        return {
            productId: product.productId,
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
            stripeProductId: product.stripeProductId,
            sold: product.isSold(),
            creationDate: product.creationDate,
            weight: product.weight,
            year: product.year
        }
    }
}