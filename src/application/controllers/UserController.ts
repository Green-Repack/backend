import { IAssociationRepository } from "../interfaces/repository/IAssociationRepository";
import { IProductRepository } from "../interfaces/repository/IProductRepository";
import { IPromoCoinsRepository } from "../interfaces/repository/IPromoCoinsRepository";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../interfaces/repository/IWarehouseRepository";
import { IDeliveryTicketHandler } from "../interfaces/services/IDeliveryTicketHandler";
import { IPaymentHandler } from "../interfaces/services/IPaymentHandler";
import { BuyUseCase } from "../useCases/user/BuyUseCase";
import { GetUserInfoUseCase } from "../useCases/user/GetUserInfoUseCase";
import { GiveGreenCoinsUseCase } from "../useCases/user/GiveGreenCoinsUseCase";
import { SellUseCase } from "../useCases/user/SellUseCase";
import { UpdateUserInfoUseCase } from "../useCases/user/UpdateUserInfoUseCase";
import { BaseController } from "./BaseController";

export class UserController extends BaseController {
    private readonly _getUserInfoUseCase = new GetUserInfoUseCase;
    private readonly _updateUserInfoUseCase = new UpdateUserInfoUseCase;
    private readonly _buyUseCase = new BuyUseCase;
    private readonly _sellUseCase = new SellUseCase;
    private readonly _giveGreenCoinsUseCase = new GiveGreenCoinsUseCase;

    private _userRepository: IUserRepository;
    private _productRepository: IProductRepository;
    private _warehouseRepository: IWarehouseRepository;
    private _associationRepository: IAssociationRepository;
    private _promoRepository: IPromoCoinsRepository;

    private _paymentHandler: IPaymentHandler;
    private _deliveryHandler: IDeliveryTicketHandler;

    public constructor(userRepository: IUserRepository, productRepository: IProductRepository, associationRepository: IAssociationRepository,
        warehouseRepository: IWarehouseRepository, paymentHandler: IPaymentHandler, deliveryHandler: IDeliveryTicketHandler,
        promoRepository: IPromoCoinsRepository) {
        super();
        this._userRepository = userRepository
        this._productRepository = productRepository
        this._warehouseRepository = warehouseRepository
        this._associationRepository = associationRepository
        this._promoRepository = promoRepository
        this._paymentHandler = paymentHandler
        this._deliveryHandler = deliveryHandler
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

    public async buyProducts(req: any, res: any, view: any) {
        try {
            let secretKey = await this._buyUseCase.execute(req.userId, req.body, this._paymentHandler, 
                this._userRepository, this._productRepository, this._warehouseRepository, this._promoRepository,
                req, view)
            res.status(200).json(secretKey)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async sellProduct(req: any, res: any) {
        try {
            let estimatePrice = await this._sellUseCase.execute(req.userId, req.body, this._deliveryHandler, 
                this._userRepository, this._productRepository)
            res.status(200).json(estimatePrice)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async giveGreenCoins(req: any, res: any) {
        try {
            await this._giveGreenCoinsUseCase.execute(req.body, req.userId, this._associationRepository, this._userRepository)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
}