import {Repository} from "../Repository";
import {IShippingLabelProps} from "./IShippingLabelProps";

export interface IShippingLabelRepository extends Repository<IShippingLabelProps>{
    getAllByProductId(productId: string): Promise<IShippingLabelProps[]>
    getAllByUserId(userId: string): Promise<IShippingLabelProps[]>
    getAllByWareHouseId(wareHouseId: string): Promise<IShippingLabelProps[]>
    getAllWhereDateIsPast(date: Date): Promise<IShippingLabelProps[]>
}
