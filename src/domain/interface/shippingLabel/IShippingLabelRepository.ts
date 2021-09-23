import {ShippingLabel} from "../../entity/ShippingLabel";
import {Repository} from "../Repository";
import {IShippingLabelProps} from "./IShippingLabelProps";

export interface IShippingLabelRepository extends Repository<ShippingLabel>{
    getAllByProductId(productId: string): Promise<IShippingLabelProps[]>
    getAllByUserId(userId: string): Promise<IShippingLabelProps[]>
    getAllByWareHouseId(wareHouseId: string): Promise<IShippingLabelProps[]>
    getAllWhereDateIsPast(date: Date): Promise<IShippingLabelProps[]>
}
