import {IAddress} from "../../../../domain/entityProperties/IAddress";
import {IProductRepository} from "../../../../domain/interface/product/IProductRepository";
import {IUserRepository} from "../../../../domain/interface/user/IUserRepository";
import {ProductServices} from "../../services/ProductServices";
import {IAcceptProduct} from "./IAcceptProduct";
import {PurchasePromiseStatus} from "../../../user/enum/PurchasePromiseStatus";

export class AcceptProduct implements IAcceptProduct{

    private _productRepository: IProductRepository;
    private _userRepository: IUserRepository;


    constructor(productRepository: IProductRepository, userRepository: IUserRepository) {
        this._productRepository = productRepository;
        this._userRepository = userRepository;
    }

    async execute(productId: string, userId: string, warehouseAddress: IAddress): Promise<string> {
        let product = await this._productRepository.getProductById(productId);
        if (!product) throw new NotFoundError("Product not found error");

        if(userId != product.creatorId) throw new UnauthorizedError("You are not the creator of this product, so therefore you are not authorized to accepted it.");

        const user = await this._userRepository.getUserById(userId);
        if (!user) throw new NotFoundError("User not found error");

        product.accepted = true;
        product.status = PurchasePromiseStatus.OrderBeingPrepared;

        return ProductServices.generateColissimoLabel(user.address, warehouseAddress);
    }
}
