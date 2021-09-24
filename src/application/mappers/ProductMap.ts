import {Product} from "../../domain/entity/Product";
import {IProductDTO} from "../user/dto/IProductDTO";

export class ProductMap {
    public static toDTO(product: Product): IProductDTO {
        return {
            name: product.name,
            creatorId: product.creatorId!,
            category: product.category!,
            specificities: product.specificities!,
            initialPrice: product.initialPrice!,
            displayPrice: product.displayPrice!,
            images: product.images,
            status: product.status,
            state: product.state,
            weight: product.weight,
            accepted: product.accepted
        }
    }

    public static toDomain(product: any): Product {
        return Product.createProduct({
            name: product.name,
            creatorId: product.creatorId!,
            category: product.category!,
            specificities: product.specificities!,
            initialPrice: product.initialPrice!,
            displayPrice: product.displayPrice!,
            images: product.images,
            status: product.status,
            state: product.state,
            weight: product.weight,
            accepted: product.accepted
        }, product.id)
    }

    public static toPersistence(product: Product): any {
        return {
            id: product.id,
            name: product.name,
            creatorId: product.creatorId!,
            category: product.category!,
            specificities: product.specificities!,
            initialPrice: product.initialPrice!,
            displayPrice: product.displayPrice!,
            images: product.images,
            status: product.status,
            state: product.state,
            weight: product.weight,
            accepted: product.accepted
        }
    }
}
