import {IShippingLabelProps} from "../entityProperties/IShippingLabelProps";
import {Entity} from "./BaseEntity";

export class ShippingLabel extends Entity<IShippingLabelProps>{

    get id(){
        return this._id!
    }

    get url(): string{
        return this.props.url
    }

    get creationDate(): Date{
        return this.props.creationDate
    }

    get productId(): string{
        return this.props.productId
    }

    get userId(): string{
        return this.props.userId
    }

    get wareHouseId(): string{
        return this.props.wareHouseId
    }

    constructor(props: IShippingLabelProps, id: string) {
        super(props, id);
    }



    public static createProduct(props: IShippingLabelProps, id?: string): ShippingLabel {
        const instance = new ShippingLabel(props, id!);
        return instance
    }

}
