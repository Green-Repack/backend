import { IProductSpecs } from "../interface/common/IProductSpecs";
import { IProductProps } from "../interface/product/IProductProps";
import { Entity } from "./BaseEntity";

export class Product extends Entity<IProductProps> {
    get name(): string {
        return this.props.name
    }

    get specs(): IProductSpecs {
        return this.props.specificities
    }

    get images(): string[] {
        return this.images
    }

    get type(): string {
        return this.props.type
    }

    get price(): number {
        return this.props.price!
    }

    private constructor(props: IProductProps, id?: string) {
        super(props, id)
    }

    public static createProduit(props: IProductProps, id?: string): Product {
        const instance = new Product(props, id)
        return instance
    }
}