import {IShippingLabelProps} from "../interface/shippingLabel/IShippingLabelProps";
import {Entity} from "./BaseEntity";

export class ShippingLabel extends Entity<IShippingLabelProps>{

    constructor(props: IShippingLabelProps, id: string) {
        super(props, id);
    }



    public static createProduct(props: IShippingLabelProps, id?: string): ShippingLabel {
        const instance = new ShippingLabel(props, id!);
        return instance
    }
    get id(){
        return this._id!
    }

    get productId(){
        return this.props.productId
    }


}
