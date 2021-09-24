import { IProduitSpecs } from "../entityProperties/IProduitSpecs";
import { IProduitProps } from "../entityProperties/IProduitProps";
import { Entity } from "./BaseEntity";

export class Produit extends Entity<IProduitProps> {
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

    get specificities(): IProduitSpecs {
        return this.props.specificities
    }

    get price(): number {
        return this.props.price!
    }

    get images(): string[] {
        return this.props.images
    }


    get marchandId(): string {
        return this.props.marchandId!
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

    private constructor(props: IProduitProps, id?: string) {
        super(props, id)
    }

    public static createProduit(props: IProduitProps, id?: string): Produit {
        const instance = new Produit(props, id)
        return instance
    }
}