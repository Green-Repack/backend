import { IAssociationRepository } from "../interfaces/repository/IAssociationRepository";
import { IGreenRepackRepository } from "../interfaces/repository/IGreenRepackRepository";
import { IProductRepository } from "../interfaces/repository/IProductRepository";
import { IPromoCoinsRepository } from "../interfaces/repository/IPromoCoinsRepository";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../interfaces/repository/IWarehouseRepository";
import { IAssociationHandler } from "../interfaces/services/IAssociationHandler";
import { IDeliveryTicketHandler } from "../interfaces/services/IDeliveryTicketHandler";
import { IPasswordHandler } from "../interfaces/services/IPasswordHandler";
import { IPaymentHandler } from "../interfaces/services/IPaymentHandler";
import { AcceptProductUseCase } from "../useCases/green_repack/AcceptProductUseCase";
import { CreateNewMemberUseCase } from "../useCases/green_repack/CreateNewMemberUseCase";
import { CreatePromoCoinsUseCase } from "../useCases/green_repack/CreatePromoCoinsUseCase";
import { CreateWarehouseUseCase } from "../useCases/green_repack/CreateWarehouseUseCase";
import { GetSellsNumberUseCase } from "../useCases/green_repack/GetSellsNumber";
import { GetStockInfoUseCase } from "../useCases/green_repack/GetStockInfoUseCase";
import { RefuseProductUseCase } from "../useCases/green_repack/RefuseProductUseCase";
import { VerifyAssociationProjectUseCase } from "../useCases/green_repack/VerifyAssociationProject";
import { VerifyAssociationUseCase } from "../useCases/green_repack/VerifyAssociationUseCase";
import { BaseController } from "./BaseController";

export class GreenRepackController extends BaseController{
    private readonly _verifyAssociationUseCase = new VerifyAssociationUseCase;
    private readonly _createNewMemberUseCase = new CreateNewMemberUseCase;
    private readonly _verifyAssociationProjectUseCase = new VerifyAssociationProjectUseCase;
    private readonly _createWarehouseUseCase = new CreateWarehouseUseCase;
    private readonly _createPromoCoins = new CreatePromoCoinsUseCase;
    private readonly _acceptProduct = new AcceptProductUseCase;
    private readonly _refuseProduct = new RefuseProductUseCase;
    private readonly _getSellsNumber = new GetSellsNumberUseCase;
    private readonly _getStockInfo = new GetStockInfoUseCase;

    private _associationRepository: IAssociationRepository;
    private _greenRepackRepository: IGreenRepackRepository;
    private _warehouseRepository: IWarehouseRepository;
    private _promoCoinsRepository: IPromoCoinsRepository;
    private _productRepository: IProductRepository;
    private _userReposiory: IUserRepository;

    private _passwordHandler: IPasswordHandler;
    private _associationHandler: IAssociationHandler;
    private _deliveryTicketHandler: IDeliveryTicketHandler;
    private _paymentHandler: IPaymentHandler

    public constructor(greenRepackRepository: IGreenRepackRepository, associatioRepostory: IAssociationRepository, userRepository: IUserRepository,
        warehouseRepository: IWarehouseRepository, productRepository: IProductRepository , promoCoinsRepository: IPromoCoinsRepository,
        passwordHandler: IPasswordHandler, associationHandler: IAssociationHandler, deliveryTicketHandler: IDeliveryTicketHandler,
        paymentHandler: IPaymentHandler) {
            super();
            this._associationRepository = associatioRepostory
            this._greenRepackRepository = greenRepackRepository
            this._productRepository = productRepository
            this._promoCoinsRepository = promoCoinsRepository
            this._warehouseRepository = warehouseRepository
            this._userReposiory = userRepository
            this._passwordHandler = passwordHandler
            this._associationHandler = associationHandler
            this._deliveryTicketHandler = deliveryTicketHandler
            this._paymentHandler = paymentHandler
    }

    public async verifyAssociation(req: any, res: any) {
        try {
            await this._verifyAssociationUseCase.execute(req.body.name, this._associationRepository, this._associationHandler)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async verifyAssociationProject(req: any, res: any) {
        try {
            const {associationName, projectName} = req.body
            await this._verifyAssociationProjectUseCase.execute(associationName, projectName, this._associationRepository)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async createNewMember(req: any, res: any) {
        try {
            let username = await this._createNewMemberUseCase.execute(req.body, this._passwordHandler, this._greenRepackRepository)
            res.status(201).json(username);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async acceptProduct(req: any, res: any) {
        try {
            const {productId, warehouseName, counterOffer} = req.body
            await this._acceptProduct.execute(productId, warehouseName, this._deliveryTicketHandler, this._paymentHandler, 
                this._userReposiory, this._productRepository, this._warehouseRepository, counterOffer)
            res.sendStatus(201)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async refuseProduct(req: any, res: any) {
        try {
            await this._refuseProduct.execute(req.body.productId, this._userReposiory, this._productRepository)
            res.ssendStatus(201)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async getSellsNumber(req: any, res: any) {
        try {
            let sellsNumber = await this._getSellsNumber.execute(req.body, this._productRepository)
            res.status(200).json(sellsNumber);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async getStockInfo(req: any, res: any) {
        try {
            const {warehouseName, productInfo} = req.body
            let stockInfo = await this._getStockInfo.execute(warehouseName, productInfo, this._warehouseRepository)
            res.status(200).json(stockInfo);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async createWarehouse(req: any, res: any) {
        try {
            let warehouseDTO = await this._createWarehouseUseCase.execute(req.body, this._warehouseRepository)
            res.status(201).json(warehouseDTO);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async createPromo(req: any, res: any) {
        try {
            await this._createPromoCoins.execute(req.body, this._promoCoinsRepository)
            res.sendStatus(201)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
    
}