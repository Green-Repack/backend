import { IPromoCoins } from "../entityProperties/IPromoCoins"
import { Entity } from "./BaseEntity"

export class PromoCoins extends Entity<IPromoCoins> {
    get id(): string {
        return this._id!
    }

    get name(): string {
        return this.props.name
    }

    
    get dateDebut(): Date {
        return this.props.dateDebut
    }

    get dateFin(): Date {
        return this.props.dateFin
    }

    get multiplicateur(): number {
        return this.props.multiplicateur
    }

    get dateCreation(): Date {
        return this.props.dateCreation
    }

    private constructor(props: IPromoCoins, id?: string) {
        super(props, id)
    }

    public static createPromoCoins(props: IPromoCoins, id?: string): PromoCoins {
        const instance = new PromoCoins(props, id)
        return instance
    }
}