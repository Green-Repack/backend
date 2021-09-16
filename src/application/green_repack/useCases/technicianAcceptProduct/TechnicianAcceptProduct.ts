import {IProductRepository} from "../../../../domain/interface/product/IProductRepository";
import {IUserRepository} from "../../../../domain/interface/user/IUserRepository";
import {PurchasePromiseStatus} from "../../../user/enum/PurchasePromiseStatus";
import {ITechnicianRefuseProduct} from "../technicianRefuseProduct/ITechnicianRefuseProduct";

export class TechnicianAcceptProduct implements ITechnicianRefuseProduct{
    private _productRepository: IProductRepository;
    private _userRepository: IUserRepository;


    constructor(productRepository: IProductRepository, userRepository: IUserRepository) {
        this._productRepository = productRepository;
        this._userRepository = userRepository;
    }

    async execute(productId: string, technicianId: string): Promise<void> {
        let product = await this._productRepository.getProductById(productId);
        if (!product) throw new NotFoundError("Product not found error");

        const user = await this._userRepository.getUserById(technicianId);
        if (!user) throw new NotFoundError("User not found error");

        //TODO Check user role

        product.accepted = true;
        product.status = PurchasePromiseStatus.Accepted;
    }

}
