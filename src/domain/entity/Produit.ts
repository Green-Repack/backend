import { IProduitSpecs } from "../interface/common/IProduitSpecs";
import { IProduitProps } from "../interface/produit/IProduitProps";
import { Entity } from "./BaseEntity";

export class Produit extends Entity<IProduitProps> {
    get name(): string {
        return this.props.name
    }

    get specs(): IProduitSpecs {
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

    private constructor(props: IProduitProps, id?: string) {
        super(props, id)
    }

    public static createProduit(props: IProduitProps, id?: string): Produit {
        const instance = new Produit(props, id)
        return instance
    }
}