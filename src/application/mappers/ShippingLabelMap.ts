import {ShippingLabel} from "../../domain/entity/ShippingLabel";
import {IShippingLabelDTO} from "../DTOs/IShippingLabelDTO";

export class ShippingLabelMap{
    public static toDTO(shippingLabel: ShippingLabel): IShippingLabelDTO{
        return {
            id: shippingLabel.id,
            url: shippingLabel.url,
            creationDate: shippingLabel.creationDate,
            productId: shippingLabel.productId,
            userId: shippingLabel.userId,
            wareHouseId: shippingLabel.wareHouseId
        }
    }

    public static toDomain(shippingLabel: any): ShippingLabel {
        return ShippingLabel.createProduct({
            url: shippingLabel.url,
            creationDate: shippingLabel.creationDate,
            productId: shippingLabel.productId,
            userId: shippingLabel.userId,
            wareHouseId: shippingLabel.wareHouseId
        }, shippingLabel.id)
    }

    public static toPersistence(shippingLabel: ShippingLabel): any{
        return {
            id: shippingLabel.id,
            url: shippingLabel.url,
            creationDate: shippingLabel.creationDate,
            productId: shippingLabel.productId,
            userId: shippingLabel.userId,
            wareHouseId: shippingLabel.wareHouseId
        }
    }
}