import { Produit } from "../../domain/entity/Produit"
import { IProduitDTO } from "../DTOs/IProduitDTO"

export class ProductMap {
    public static toDTO(product: Produit): IProduitDTO {
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
            marchandId: product.marchandId,
            warehouseId: product.warehouseId,
            accepted: product.accepted,
            sold: product.isSold(),
            creationDate: product.creationDate,
            acceptationDate: product.acceptationDate
        }
    }

    public static toDomain(product: any): Produit {
        return product.createEntrepot({
            name: product.name,
            category: product.category,
            brand: product.brand,
            model: product.model,
            specificities: product.specificities,
            price: product.price,
            priceSeller: product.priceSeller,
            images: product.images,
            marchandId: product.marchandId,
            warehouseId: product.warehouseId,
            accepted: product.accepted,
            sold: product.isSold(),
            creationDate: product.creationDate,
            acceptationDate: product.acceptationDate
        }, product.id)
    }

    public static toPersistence(product: Produit): any {
        return {
            name: product.name,
            category: product.category,
            brand: product.brand,
            model: product.model,
            specificities: product.specificities,
            price: product.price,
            priceSeller: product.priceSeller,
            images: product.images,
            marchandId: product.marchandId,
            warehouseId: product.warehouseId,
            accepted: product.accepted,
            sold: product.isSold(),
            creationDate: product.creationDate,
            acceptationDate: product.acceptationDate
        }
    }
}