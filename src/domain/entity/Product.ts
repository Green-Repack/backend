import { IProductProps } from "../entityProperties/IProductProps";
import { Entity } from "./BaseEntity";
import { EProductState } from "../entityProperties/EProductState";
import { EPurchasePromiseStatus } from "../entityProperties/EPurchasePromiseStatus";
import { EProductCategory } from "../entityProperties/EProductCategory";

export class Product extends Entity<IProductProps> {
    get productId(): string {
        return this.props.productId
    }

    get name(): string {
        return this.props.name
    }

    get category(): EProductCategory {
        return this.props.category
    }

    get brand(): string {
        return this.props.brand
    }

    get model(): string {
        return this.props.model
    }

    get specificities(): string[] {
        return this.props.specificities
    }

    get price(): number {
        return this.props.price!
    }

    get images(): string[] {
        return this.props.images
    }

    get stripeProductId(): string {
        return this.props.stripeProductId!
    }

    get merchantId(): string {
        
        return this.props.merchantId!
    }
    get creationDate(): Date {
        return this.props.creationDate
    }

    get state(): EProductState {
        return this.props.state
    }

    get sellingStatus(): EPurchasePromiseStatus {
        return this.props.sellingStatus
    }

    get warehouseId(): string {
        return this.props.warehouseId!
    }

    get weight(): number {
        return this.props.weight
    }

    get year(): number {
        return this.props.year
    }

    get priceSeller(): number {
        return this.props.priceSeller!
    }
    public isSold(): boolean {
        return this.props.sold
    }

    private constructor(props: IProductProps, id?: string) {
        super(props, id)
    }

    public static createProduct(props: IProductProps, id?: string): Product {
        const instance = new Product(props, id)
        return instance
    }
}