import {IShippingLabelProps} from "../../../domain/interface/shippingLabel/IShippingLabelProps";
import {IShippingLabelRepository} from "../../../domain/interface/shippingLabel/IShippingLabelRepository";

export class ShippingLabelRepository implements IShippingLabelRepository{
    delete(id: string): Promise<void> {
        return undefined;
    }

    exists(idOrEmail: string): Promise<boolean> {
        return undefined;
    }

    getAllByProductId(productId: string): Promise<IShippingLabelProps[]> {
        return undefined;
    }

    getAllByUserId(userId: string): Promise<IShippingLabelProps[]> {
        return undefined;
    }

    getAllByWareHouseId(wareHouseId: string): Promise<IShippingLabelProps[]> {
        return undefined;
    }

    getAllWhereDateIsPast(date: Date): Promise<IShippingLabelProps[]> {
        return undefined;
    }

    save(t: IShippingLabelProps): Promise<void> {
        return undefined;
    }

}
