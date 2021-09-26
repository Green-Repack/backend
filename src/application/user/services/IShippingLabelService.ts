import {ShippingLabel} from "../../../domain/entity/ShippingLabel";
import {User} from "../../../domain/entity/User";
import {Warehouse} from "../../../domain/entity/Warehouse";
import {IShippingLabelProps} from "../../../domain/entityProperties/IShippingLabelProps";
import {ShippingLabelRepository} from "../../../infrastructure/persistence/repositories/ShippingLabelRepository";
import {UserRepository} from "../../../infrastructure/persistence/repositories/UserRepository";
import {WarehouseRepository} from "../../../infrastructure/persistence/repositories/WarehouseRepository";

export interface IShippingLabelService {
    _shippingLabelRepository: ShippingLabelRepository;

    generateLabel(productId: string, wareHouse: Warehouse, user: User): Promise<ShippingLabel>
}