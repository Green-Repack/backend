import { IProductProps } from "../interface/product/IProductProps";
import { Entity } from "./BaseEntity";

export class Product extends Entity<IProductProps> {

    getId(){
        return this._id
    }

    getName(){
        return this.props.name
    }

    getCreatorId(){
        return this.props.creatorId
    }

    getCategory(){
        return this.props.category
    }

    getSpecificities(){
        return this.props.specificities
    }

    getInitialPrice(){
        return this.props.initialPrice
    }

    getDisplayPrice(){
        return this.props.displayPrice
    }

    getImages(){
        return this.props.images
    }

    getStatus(){
        return this.props.status
    }

    getState(){
        return this.props.state
    }

    getWeight(){
        return this.props.weight
    }

    isAccepted(){
        return this.props.accepted
    }

    private constructor(props: IProductProps, id?: string) {
        super(props, id)
    }

    public static createProduct(props: IProductProps, id?: string): Product {
        const instance = new Product(props, id)
        return instance
    }
}