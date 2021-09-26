import {ShippingLabel} from "../../../../domain/entity/ShippingLabel";

export interface IAcceptProduct{
    execute(productId: string, userId: string, wareHouseId: string): Promise<ShippingLabel>
}
