import {ShippingLabel} from "../../../domain/entity/ShippingLabel";
import {IAddress} from "../../../domain/entityProperties/IAddress";
import {ShippingLabelRepository} from "../../../infrastructure/persistence/repositories/ShippingLabelRepository";
import {UserRepository} from "../../../infrastructure/persistence/repositories/UserRepository";
import {WarehouseRepository} from "../../../infrastructure/persistence/repositories/WarehouseRepository";
import {IShippingLabelDTO} from "../../DTOs/IShippingLabelDTO";
import {IShippingLabelService} from "../../interfaces/services/IShippingLabelService";
import {ShippingLabelMap} from "../../mappers/ShippingLabelMap";

export class ShippingLabelService implements IShippingLabelService{
    _userRepository: UserRepository;
    _wareHouseRepository: WarehouseRepository;
    _shippingLabelRepository: ShippingLabelRepository;

    constructor(shippingLabelRepository: ShippingLabelRepository, wareHouseRepository: WarehouseRepository, userRepository: UserRepository) {
        this._shippingLabelRepository = shippingLabelRepository;
        this._userRepository = userRepository;
        this._wareHouseRepository = wareHouseRepository;
    }

    async generateLabel(shippingLabel: IShippingLabelDTO): Promise<ShippingLabel> {
        let user = await this._userRepository.getUserById(shippingLabel.userId)
        let wareHouse = await this._wareHouseRepository.getWarehouseByName(shippingLabel.userId)
        shippingLabel.url = this.generateColissimoUrl(user?.address, wareHouse.location)

        let model = ShippingLabelMap.toDomain(shippingLabel);
        await this._shippingLabelRepository.save(model);

        return model
    }

    generateColissimoUrl(userAddress: IAddress, wareHouseAddress: IAddress): string{
        return "https://shippinglabelgr.blob.core.windows.net/pdf/preview-colissimo-5y00002479163-1.pdf"
    }

}