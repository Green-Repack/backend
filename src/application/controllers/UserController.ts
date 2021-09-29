import autoBind from "auto-bind";
import { inject, injectable } from "inversify";
import { TYPES } from "../commons/types";
import { IAssociationRepository } from "../interfaces/repository/IAssociationRepository";
import { IProductRepository } from "../interfaces/repository/IProductRepository";
import { IPromoCoinsRepository } from "../interfaces/repository/IPromoCoinsRepository";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../interfaces/repository/IWarehouseRepository";
import { IDeliveryTicketHandler } from "../interfaces/services/IDeliveryTicketHandler";
import { IGeneratorIdHandler } from "../interfaces/services/IGeneratorIdHandler";
import { IPaymentHandler } from "../interfaces/services/IPaymentHandler";
import { AcceptCounterOfferUseCase } from "../useCases/user/AcceptCounterOfferUseCase";
import { AcceptEstimationUseCase } from "../useCases/user/AcceptEstimationUseCase";
import { BuyUseCase } from "../useCases/user/BuyUseCase";
import { GetUserInfoUseCase } from "../useCases/user/GetUserInfoUseCase";
import { GiveGreenCoinsUseCase } from "../useCases/user/GiveGreenCoinsUseCase";
import { RefuseCounterOfferUseCase } from "../useCases/user/RefuseCounterOfferUseCase";
import { RefuseEstimationUseCase } from "../useCases/user/RefuseEstimationUseCase";
import { SellUseCase } from "../useCases/user/SellUseCase";
import { UpdateUserInfoUseCase } from "../useCases/user/UpdateUserInfoUseCase";

@injectable()
export class UserController {
    private readonly _getUserInfoUseCase = new GetUserInfoUseCase;
    private readonly _updateUserInfoUseCase = new UpdateUserInfoUseCase;
    private readonly _buyUseCase = new BuyUseCase;
    private readonly _sellUseCase = new SellUseCase;
    private readonly _giveGreenCoinsUseCase = new GiveGreenCoinsUseCase;
    private readonly _acceptEsitmationUseCase = new AcceptEstimationUseCase;
    private readonly _acceptCounterOfferUseCase = new AcceptCounterOfferUseCase;
    private readonly _refuseEsitmationUseCase = new RefuseEstimationUseCase;
    private readonly _refuseCounterOfferUseCase = new RefuseCounterOfferUseCase;

    @inject(TYPES.IUserRepository)
    private _userRepository: IUserRepository;
    @inject(TYPES.IProductRepository)
    private _productRepository: IProductRepository;
    @inject(TYPES.IWarehouseRepository)
    private _warehouseRepository: IWarehouseRepository;
    @inject(TYPES.IAssociationRepository)
    private _associationRepository: IAssociationRepository;
    @inject(TYPES.IPromoCoinsRepository)
    private _promoRepository: IPromoCoinsRepository;

    @inject(TYPES.IPaymentHandler)
    private _paymentHandler: IPaymentHandler;
    @inject(TYPES.IDeliveryTicketHandler)
    private _deliveryHandler: IDeliveryTicketHandler;
    @inject(TYPES.IGenertorIdHandler)
    private _IdGeneratorHandler: IGeneratorIdHandler;

    public constructor() {
        autoBind(this);
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
            await this._updateUserInfoUseCase.execute(req.userId, req.body, this._userRepository)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async buyProducts(req: any, res: any) {
        try {
            const {itemsBucket} = req.body
            let secretKey = await this._buyUseCase.execute(req.userId, itemsBucket, this._paymentHandler, this._IdGeneratorHandler,
                this._userRepository, this._productRepository, this._warehouseRepository, this._promoRepository)
            res.status(200).json(secretKey)
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

    public async sellProduct(req: any, res: any) {
        try {
            let estimatePrice = await this._sellUseCase.execute(req.userId, req.body, this._IdGeneratorHandler,
                this._userRepository, this._productRepository)
            res.status(200).json(estimatePrice)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async acceptEstimation(req: any, res: any) {
        try {
            const {productId} = req.body
            await this._acceptEsitmationUseCase.execute(productId, this._deliveryHandler,
                this._userRepository, this._productRepository)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async refuseEstimation(req: any, res: any) {
        try {
            const {productId} = req.body
            await this._refuseEsitmationUseCase.execute(productId, this._productRepository)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async accaptCounterOffer(req: any, res: any) {
        try {
            const {productId} = req.body
            await this._acceptCounterOfferUseCase.execute(productId, this._paymentHandler,
                this._userRepository, this._productRepository, this._warehouseRepository)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async refuseCounterOffer(req: any, res: any) {
        try {
            const {productId, deliveryFee} = req.body
            await this._refuseCounterOfferUseCase.execute(productId, deliveryFee, this._paymentHandler, this._productRepository)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
}