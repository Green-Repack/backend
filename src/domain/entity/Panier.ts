import { IPanierProps } from "../interface/panier/IPanierProps";
import { Entity } from "./BaseEntity";
import { Product } from "./Product";

export class Panier extends Entity<IPanierProps> {
    get items(): Product[] {
        return this.props.items
    }

    get totalPrice(): number {
        return this.props.totalPrice
    }

    private constructor(props: IPanierProps, id?: string) {
        super(props, id)
    }

    public static createPanier(props: IPanierProps, id?: string): Panier {
        const instance = new Panier(props, id)
        return instance
    }

    public addItem(product: Product, quantity: number): void {
        // ajouter un produit à la liste des items et calculer le total du panier
    }

    public removeItem(productId: string): void {
        /* retirer un article du panier en fonction de son nom
            gérer aussi le cas de la quantité
        */
    }

    public clearPanier(): void {
        // supprimer tout les items du panier et remettre le total à 0
    }
}