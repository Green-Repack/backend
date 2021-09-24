import {ShippingLabel} from "../../../domain/entity/ShippingLabel";
import {Repository} from "../../../domain/interface/Repository";
import {IShippingLabelProps} from "../../../domain/entityProperties/IShippingLabelProps";

export interface IShippingLabelRepository extends Repository<ShippingLabel>{
    getAllByProductId(productId: string): Promise<IShippingLabelProps[]>
    getAllByUserId(userId: string): Promise<IShippingLabelProps[]>
    getAllByWareHouseId(wareHouseId: string): Promise<IShippingLabelProps[]>
    getAllWhereDateIsPast(date: Date): Promise<IShippingLabelProps[]>
}
