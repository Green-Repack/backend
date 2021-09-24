import {IShippingLabelProps} from "../interface/shippingLabel/IShippingLabelProps";
import {Entity} from "./BaseEntity";

export class ShippingLabel extends Entity<IShippingLabelProps>{

    get id(){
        return this._id!
    }

    get url(): string{
        return this.url!
    }

    get creationDate(): Date{
        return this.creationDate!
    }

    get productId(): string{
        return this.productId!
    }

    get userId(): string{
        return this.userId!
    }

    get wareHouseId(): string{
        return this.wareHouseId!
    }

    constructor(props: IShippingLabelProps, id: string) {
        super(props, id);
    }



    public static createProduct(props: IShippingLabelProps, id?: string): ShippingLabel {
        const instance = new ShippingLabel(props, id!);
        return instance
    }

}
