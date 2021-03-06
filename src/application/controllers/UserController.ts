import autoBind from "auto-bind";
import { inject, injectable } from "inversify";
import { TYPES } from "../commons/types";
import { IAssociationRepository } from "../interfaces/repository/IAssociationRepository";
import { IProductPriceRepository } from "../interfaces/repository/IProductPriceRepository";
import { IProductRepository } from "../interfaces/repository/IProductRepository";
import { IPromoCoinsRepository } from "../interfaces/repository/IPromoCoinsRepository";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../interfaces/repository/IWarehouseRepository";
import { IDeliveryTicketHandler } from "../interfaces/services/IDeliveryTicketHandler";
import { IGeneratorIdHandler } from "../interfaces/services/IGeneratorIdHandler";
import { IPushNotifHandler } from "../interfaces/services/IPushNotifHandler";
import { IStripeHandler } from "../interfaces/services/IStripeHandler";
import { AcceptCounterOfferUseCase } from "../useCases/user/AcceptCounterOfferUseCase";
import { AcceptEstimationUseCase } from "../useCases/user/AcceptEstimationUseCase";
import { BuyUseCase } from "../useCases/user/BuyUseCase";
import { GetProductBackUseCase } from "../useCases/user/GetProductBackUseCase";
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
    private readonly _getProductBackUseCase = new GetProductBackUseCase;

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
    @inject(TYPES.IProductPriceRepository)
    private _productPriceRepository: IProductPriceRepository

    @inject(TYPES.IStripeHandler)
    private _stripeHandler: IStripeHandler;
    @inject(TYPES.IDeliveryTicketHandler)
    private _deliveryHandler: IDeliveryTicketHandler;
    @inject(TYPES.IGenertorIdHandler)
    private _IdGeneratorHandler: IGeneratorIdHandler;
    @inject(TYPES.IPushNotifHandler)
    private _notifHandler: IPushNotifHandler;

    public constructor() {
        autoBind(this);
    }

    public async getUserInfo(req: any, res: any) {
        try {
            let userInfo = await this._getUserInfoUseCase.execute(req.userId, this._userRepository)
            res.status(200).json(userInfo)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }
    
    public async updateUserInfo(req: any, res: any) {
        try {
            await this._updateUserInfoUseCase.execute(req.userId, req.body, this._userRepository)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async buyProducts(req: any, res: any) {
        try {
            const {productId} = req.body
            let secretKey = await this._buyUseCase.execute(req.userId, productId, this._stripeHandler,
                this._userRepository, this._productRepository)
            res.status(200).json(secretKey)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async giveGreenCoins(req: any, res: any) {
        try {
            await this._giveGreenCoinsUseCase.execute(req.body, req.userId, this._associationRepository, this._userRepository)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async sellProduct(req: any, res: any) {
        try {
            let estimatePrice = await this._sellUseCase.execute(req.userId, req.body, this._IdGeneratorHandler,
                this._userRepository, this._productRepository, this._productPriceRepository)
            res.status(200).json(estimatePrice)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async acceptEstimation(req: any, res: any) {
        try {
            const {productId, warehouseName} = req.body
            await this._acceptEsitmationUseCase.execute(productId, warehouseName, this._deliveryHandler,
                this._userRepository, this._productRepository, this._warehouseRepository)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async refuseEstimation(req: any, res: any) {
        try {
            const {productId} = req.body
            await this._refuseEsitmationUseCase.execute(productId, this._userRepository, this._productRepository)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async acceptCounterOffer(req: any, res: any) {
        try {
            const {productId} = req.body
            await this._acceptCounterOfferUseCase.execute(productId, this._stripeHandler, this._notifHandler,
                this._userRepository, this._productRepository, this._warehouseRepository)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async refuseCounterOffer(req: any, res: any) {
        try {
            const {productId} = req.body
            let secretKey = await this._refuseCounterOfferUseCase.execute(productId, this._stripeHandler, this._deliveryHandler,
                this._userRepository, this._productRepository)
            res.status(200).json(secretKey)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async getBackProduct(req: any, res: any) {
        try {
            const {productId} = req.body
            let secretKey = await this._getProductBackUseCase.execute(productId, this._stripeHandler, this._deliveryHandler,
                this._userRepository, this._productRepository)
                res.status(200).json(secretKey)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }
}
