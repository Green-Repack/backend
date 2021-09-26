import { IProductPriceProps } from "../entityProperties/IProductPriceProps";
import { Entity } from "./BaseEntity";

export class ProductPrice extends Entity<IProductPriceProps>{
    get id(): string {
        return this._id
    }

    get productCategory(): string {
        return this.props.productCategory
    }

    get productState(): string {
        return this.props.productState
    }

    get price(): number {
        return this.props.price
    }

    
    private constructor(props: IProductPriceProps, id?: string) {
        super(props, id)
    }

    public static createProductPrice(props: IProductPriceProps, id?: string): ProductPrice {
        const instance = new ProductPrice(props, id)
        return instance
    }
}