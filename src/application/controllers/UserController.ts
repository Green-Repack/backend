import { IProductRepository } from "../interfaces/repository/IProductRepository";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../interfaces/repository/IWarehouseRepository";
import { IPaymentHandler } from "../interfaces/services/IPaymentHandler";
import { BuyUseCase } from "../useCases/user/BuyUseCase";
import { GetUserInfoUseCase } from "../useCases/user/GetUserInfoUseCase";
import { UpdateUserInfoUseCase } from "../useCases/user/UpdateUserInfoUseCase";
import { BaseController } from "./BaseController";

export class UserController extends BaseController {
    private readonly _getUserInfoUseCase = new GetUserInfoUseCase;
    private readonly _updateUserInfoUseCase = new UpdateUserInfoUseCase;
    private readonly _buyUseCase = new BuyUseCase;

    private _userRepository: IUserRepository;
    private _productRepository: IProductRepository;
    private _warehouseRepository: IWarehouseRepository;

    private _paymentHandler: IPaymentHandler;

    public constructor(userRepository: IUserRepository, productRepository: IProductRepository, 
        warehouseRepository: IWarehouseRepository, paymentHandler: IPaymentHandler) {
        super();
        this._userRepository = userRepository
        this._productRepository = productRepository
        this._warehouseRepository = warehouseRepository
        this._paymentHandler = paymentHandler
    }

    public async getUserInfo(req: any, res: any) {
        try {
            let userInfo = await this._getUserInfoUseCase.execute(req.userId, this._userRepository)
            res.status(200).json(userInfo)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async updateUserInfo(req: any, res: any) {
        try {
            let userInfo = await this._updateUserInfoUseCase.execute(req.userId, req.body, this._userRepository)
            res.status(200).json(userInfo)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async buyProducts(req: any, res: any) {
        try {
            let secretKey = await this._buyUseCase.execute(req.userId, req.body, this._paymentHandler, 
                this._userRepository, this._productRepository, this._warehouseRepository)
            res.status(200).json(secretKey)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    } 
}