import { IProductSpecs } from "../entityProperties/IProductSpecs";
import { IProductProps } from "../entityProperties/IProductProps";
import { Entity } from "./BaseEntity";

export class Product extends Entity<IProductProps> {
    get id(): string {
        return this._id!
    }

    get name(): string {
        return this.props.name
    }

    get category(): string {
        return this.props.category
    }

    get brand(): string {
        return this.props.brand
    }

    get model(): string {
        return this.props.model
    }

    get specificities(): IProductSpecs {
        return this.props.specificities
    }

    get price(): number {
        return this.props.price!
    }

    get images(): string[] {
        return this.props.images
    }


    get merchantId(): string {
        return this.props.merchantId!
    }

    get accepted(): boolean {
        return this.props.accepted!
    }

    get creationDate(): Date {
        return this.props.creationDate
    }

    get acceptationDate(): Date {
        return this.props.acceptationDate!
    }

    get warehouseId(): string {
        return this.props.warehouseId!
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