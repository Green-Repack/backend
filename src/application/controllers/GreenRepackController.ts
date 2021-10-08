import autoBind from "auto-bind";
import { inject, injectable } from "inversify";
import { TYPES } from "../commons/types";
import { IAssociationRepository } from "../interfaces/repository/IAssociationRepository";
import { IGreenRepackRepository } from "../interfaces/repository/IGreenRepackRepository";
import { IProductRepository } from "../interfaces/repository/IProductRepository";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../interfaces/repository/IWarehouseRepository";
import { IAssociationHandler } from "../interfaces/services/IAssociationHandler";
import { IPasswordHandler } from "../interfaces/services/IPasswordHandler";
import { IStripeHandler } from "../interfaces/services/IStripeHandler";
import { IGeneratorIdHandler } from "../interfaces/services/IGeneratorIdHandler";
import { AcceptProductUseCase } from "../useCases/green_repack/AcceptProductUseCase";
import { AddProductUseCase } from "../useCases/product/AddProductUseCase";
import { CreateNewMemberUseCase } from "../useCases/green_repack/CreateNewMemberUseCase";
import { GetMemberInfoUseCase } from "../useCases/green_repack/GetMemberInfoUseCase";
import { MakeCounterOfferUseCase } from "../useCases/green_repack/MakeCounterOfferUseCase";
import { RefuseProductUseCase } from "../useCases/green_repack/RefuseProductUseCase";
import { VerifyAssociationProjectUseCase } from "../useCases/green_repack/VerifyAssociationProjectUseCase";
import { VerifyAssociationUseCase } from "../useCases/green_repack/VerifyAssociationUseCase";
import { IPushNotifHandler } from "../interfaces/services/IPushNotifHandler";
import { IProductPriceRepository } from "../interfaces/repository/IProductPriceRepository";

@injectable()
export class GreenRepackController{
    private readonly _createNewMemberUseCase = new CreateNewMemberUseCase;
    private readonly _addProductUseCase = new AddProductUseCase;
    private readonly _acceptProductUseCase = new AcceptProductUseCase;
    private readonly _refuseProductUseCase = new RefuseProductUseCase;
    private readonly _verifyAssociationUseCase = new VerifyAssociationUseCase;
    private readonly _verifyAssociationProjectUseCase = new VerifyAssociationProjectUseCase;
    private readonly _getInfoUseCase = new GetMemberInfoUseCase;
    private readonly _makeCounterOfferUseCase = new MakeCounterOfferUseCase;
    
    @inject(TYPES.IGreenRepackRepository)
    private _greenRepackRepository: IGreenRepackRepository;
    @inject(TYPES.IWarehouseRepository)
    private _warehouseRepository: IWarehouseRepository;
    @inject(TYPES.IProductPriceRepository)
    private _productPriceRepository: IProductPriceRepository
    @inject(TYPES.IUserRepository)
    private _userRepository: IUserRepository;
    @inject(TYPES.IProductRepository)
    private _productRepository: IProductRepository;
    @inject(TYPES.IAssociationRepository)
    private _associationRepository!: IAssociationRepository;
    
    @inject(TYPES.IStripeHandler)
    private _stripeHandler: IStripeHandler
    @inject(TYPES.IPasswordHandler)
    private _passwordHandler: IPasswordHandler;
    @inject(TYPES.IAssociationHandler)
    private _associationHandler: IAssociationHandler;
    @inject(TYPES.IGenertorIdHandler)
    private _iDGeneratorHandler: IGeneratorIdHandler;
    @inject(TYPES.IPushNotifHandler)
    private _notifHandler: IPushNotifHandler;

    public constructor() {
        autoBind(this)
    }

    public async createNewMember(req: any, res: any) {
        try {
            let username = await this._createNewMemberUseCase.execute(req.body, this._passwordHandler, this._greenRepackRepository)
            res.status(201).json(username);
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async getInfo(req: any, res: any) {
        try {
            let memberInfo = await this._getInfoUseCase.execute(req.userId, this._greenRepackRepository)
            res.status(200).json(memberInfo);
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async addProduct(req: any, res: any) {
        try {
            const {warehouseName, productInfo} = req.body
            await this._addProductUseCase.execute(warehouseName, productInfo, this._iDGeneratorHandler, 
                this._productRepository, this._warehouseRepository, this._productPriceRepository)
            res.sendStatus(200);
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async acceptProduct(req: any, res: any) {
        try {
            const {productId, warehouseName} = req.body
            await this._acceptProductUseCase.execute(productId, warehouseName, this._stripeHandler, this._notifHandler,
                this._userRepository, this._productRepository, this._warehouseRepository)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }


    public async makeCounterOffer(req: any, res: any) {
        try {
            const {productId, warehouseName, counterOffer} = req.body
            await this._makeCounterOfferUseCase.execute(productId, warehouseName, counterOffer, 
                this._warehouseRepository, this._productRepository, this._userRepository)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async refuseProduct(req: any, res: any) {
        try {
            const {productId} = req.body
            await this._refuseProductUseCase.execute(productId, this._userRepository, this._productRepository)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async verifyAssociation(req: any, res: any) {
        try {
            await this._verifyAssociationUseCase.execute(req.body.associationName, this._associationRepository, this._associationHandler)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async verifyAssociationProject(req: any, res: any) {
        try {
            const {associationName, projectName} = req.body
            await this._verifyAssociationProjectUseCase.execute(associationName, projectName, this._associationRepository)
            res.sendStatus(200)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }
}
