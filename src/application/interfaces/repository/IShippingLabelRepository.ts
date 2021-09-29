import {ShippingLabel} from "../../../domain/entity/ShippingLabel";
import {IShippingLabelProps} from "../../../domain/entityProperties/IShippingLabelProps";
import { IBaseRepository } from "./IBaseRepositoty";

export interface IShippingLabelRepository extends IBaseRepository<ShippingLabel>{
    getAllByProductId(productId: string): Promise<IShippingLabelProps[]>
    getAllByUserId(userId: string): Promise<IShippingLabelProps[]>
    getAllByWareHouseId(wareHouseId: string): Promise<IShippingLabelProps[]>
    getAllWhereDateIsPast(date: Date): Promise<IShippingLabelProps[]>
}
