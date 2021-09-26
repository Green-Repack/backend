import {ShippingLabel} from "../../../domain/entity/ShippingLabel";
import {User} from "../../../domain/entity/User";
import {Warehouse} from "../../../domain/entity/Warehouse";
import {IAddress} from "../../../domain/entityProperties/IAddress";
import {ShippingLabelRepository} from "../../../infrastructure/persistence/repositories/ShippingLabelRepository";
import {IShippingLabelService} from "./IShippingLabelService";
import {ShippingLabelMap} from "../../mappers/ShippingLabelMap";

export class ShippingLabelService implements IShippingLabelService{
    _shippingLabelRepository: ShippingLabelRepository;

    constructor(shippingLabelRepository: ShippingLabelRepository) {
        this._shippingLabelRepository = shippingLabelRepository;
    }

    async generateLabel(productId: string, wareHouse: Warehouse, user: User): Promise<ShippingLabel> {
        let url = await this.generateColissimoUrl(user.address, wareHouse.location)

        return ShippingLabelMap.toDomain({
            url: url,
            creationDate: new Date(),
            productId: productId,
            wareHouseId : wareHouse.id,
            userId: user.id
        })

    }

    async generateColissimoUrl(userAddress: IAddress, wareHouseAddress: IAddress): Promise<string>{
        return "https://shippinglabelgr.blob.core.windows.net/pdf/preview-colissimo-5y00002479163-1.pdf"
    }

}