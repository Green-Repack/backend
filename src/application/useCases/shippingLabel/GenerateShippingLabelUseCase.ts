import {ShippingLabel} from "../../../domain/entity/ShippingLabel";
import {IAddress} from "../../../domain/entityProperties/IAddress";
import {ShippingLabelRepository} from "../../../infrastructure/persistence/repositories/ShippingLabelRepository";
import {UserRepository} from "../../../infrastructure/persistence/repositories/UserRepository";
import {WarehouseRepository} from "../../../infrastructure/persistence/repositories/WarehouseRepository";
import {Guard} from "../../commons/Guard";
import {IShippingLabelDTO} from "../../DTOs/IShippingLabelDTO";
import {IGenerateShippingLabelUseCase} from "./IGenerateShippingLabelUseCase";
import {ShippingLabelMap} from "../../mappers/ShippingLabelMap";

export class GenerateShippingLabelUseCase implements IGenerateShippingLabelUseCase{
    _userRepository: UserRepository;
    _wareHouseRepository: WarehouseRepository;
    _shippingLabelRepository: ShippingLabelRepository;

    constructor(shippingLabelRepository: ShippingLabelRepository, wareHouseRepository: WarehouseRepository, userRepository: UserRepository) {
        this._shippingLabelRepository = shippingLabelRepository;
        this._userRepository = userRepository;
        this._wareHouseRepository = wareHouseRepository;
    }

    async generateLabel(shippingLabel: IShippingLabelDTO): Promise<ShippingLabel> {
        Guard.AgainstNullOrUndefined(shippingLabel.productId, "product id required !");
        Guard.AgainstNullOrUndefined(shippingLabel.userId, "user id required !");
        Guard.AgainstNullOrUndefined(shippingLabel.wareHouseId, "wareHouse id required !");

        let user = await this._userRepository.getUserById(shippingLabel.userId)
        if(!user) throw new NotFoundError("User not found");

        let wareHouse = await this._wareHouseRepository.getWarehouseByName(shippingLabel.userId)
        if(!wareHouse) throw new NotFoundError("WareHouse not found");

        shippingLabel.creationDate = new Date()

        shippingLabel.url = this.generateColissimoUrl(user.address, wareHouse.location)

        return ShippingLabelMap.toDomain(shippingLabel);
    }

    generateColissimoUrl(userAddress: IAddress, wareHouseAddress: IAddress): string{
        return "https://shippinglabelgr.blob.core.windows.net/pdf/preview-colissimo-5y00002479163-1.pdf"
    }

}