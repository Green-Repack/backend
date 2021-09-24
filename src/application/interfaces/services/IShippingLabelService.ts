import {ShippingLabel} from "../../../domain/entity/ShippingLabel";
import {IShippingLabelProps} from "../../../domain/entityProperties/IShippingLabelProps";
import {ShippingLabelRepository} from "../../../infrastructure/persistence/repositories/ShippingLabelRepository";
import {UserRepository} from "../../../infrastructure/persistence/repositories/UserRepository";
import {WarehouseRepository} from "../../../infrastructure/persistence/repositories/WarehouseRepository";

export interface IShippingLabelService{
    _shippingLabelRepository: ShippingLabelRepository;
    _userRepository: UserRepository
    _wareHouseRepository: WarehouseRepository

    generateLabel(shippingLabel: IShippingLabelProps ): Promise<ShippingLabel>
}