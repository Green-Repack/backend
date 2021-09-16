import {PurchasePromiseStatus} from "../../application/user/enum/PurchasePromiseStatus";
import { IProductProps } from "../interface/product/IProductProps";
import { Entity } from "./BaseEntity";

export class Product extends Entity<IProductProps> {

    get id(){
        return this._id!
    }

    get name(){
        return this.props.name
    }

    get creatorId(){
        return this.props.creatorId
    }

    get category(){
        return this.props.category
    }

    get specificities(){
        return this.props.specificities
    }

    get initialPrice(){
        return this.props.initialPrice
    }

    get displayPrice(){
        return this.props.displayPrice
    }

    get images(){
        return this.props.images
    }

    get status(){
        return this.props.status
    }

    get state(){
        return this.props.state
    }

    get weight(){
        return this.props.weight
    }

    get accepted(){
        return this.props.accepted
    }

    set accepted(accepted: boolean){
        this.accepted=accepted;
    }

    set status(status: PurchasePromiseStatus){
        this.status=status;
    }



    private constructor(props: IProductProps, id?: string) {
        super(props, id)
    }

    public static createProduct(props: IProductProps, id?: string): Product {
        const instance = new Product(props, id)
        return instance
    }
}
