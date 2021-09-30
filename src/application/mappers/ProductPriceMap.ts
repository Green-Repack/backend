import {ProductPrice} from "../../domain/entity/ProductPrice";

export class ProductPriceMap{
    public static toDomain(productPrice: any): ProductPrice {
        return ProductPrice.createProductPrice({
            productCategory: productPrice.productCategory,
            productState: productPrice.productState,
            price: productPrice.price,
        }, productPrice.id)
    }
}
