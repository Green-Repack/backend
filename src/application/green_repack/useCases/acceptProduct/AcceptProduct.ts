import {ShippingLabel} from "../../../../domain/entity/ShippingLabel";
import {WarehouseRepository} from "../../../../infrastructure/persistence/repositories/WarehouseRepository";
import {IProductRepository} from "../../../interfaces/repository/IProductRepository";
import {IUserRepository} from "../../../../domain/interface/user/IUserRepository";
import {ProductMap} from "../../../mappers/ProductMap";
import {ShippingLabelService} from "../../../user/services/ShippingLabelService";
import {IAcceptProduct} from "./IAcceptProduct";
import {PurchasePromiseStatus} from "../../../user/enum/PurchasePromiseStatus";

export class AcceptProduct implements IAcceptProduct{

    private _productRepository: IProductRepository;
    private _userRepository: IUserRepository;
    private _shippingLabelService: ShippingLabelService
    _wareHouseRepository: WarehouseRepository;


    constructor(productRepository: IProductRepository, userRepository: IUserRepository, shippingLabelService: ShippingLabelService, wareHouseRepository: WarehouseRepository) {
        this._productRepository = productRepository;
        this._userRepository = userRepository;
        this._shippingLabelService = shippingLabelService;
        this._wareHouseRepository = wareHouseRepository
    }

    async execute(productId: string, userId: string, wareHouseId: string): Promise<ShippingLabel> {
        let product = await this._productRepository.getProductById(productId);
        if (!product) throw new NotFoundError("Product not found error");

        if(userId != product.merchantId) throw new UnauthorizedError("You are not the creator of this product, so therefore you are not authorized to accepted it.");

        const user = await this._userRepository.getUserById(userId);
        if (!user) throw new NotFoundError("User not found error");

        let wareHouse = await this._wareHouseRepository.getWarehouseById(wareHouseId)
        if(!wareHouse) throw new NotFoundError("WareHouse not found");

        let newProduct = ProductMap.toDTO(product)

        newProduct.accepted = true;
        newProduct.status = PurchasePromiseStatus.OrderBeingPrepared;

        await this._productRepository.save(ProductMap.toDomain(newProduct));

        return this._shippingLabelService.generateLabel(productId, wareHouse, user);
    }
}