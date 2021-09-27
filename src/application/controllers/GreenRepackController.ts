import autoBind from "auto-bind";
import { inject, injectable } from "inversify";
import { TYPES } from "../commons/types";
import { NotFoundError } from "../errors/NotFoundError";
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
import { DeleteWarehouseUseCase } from "../useCases/green_repack/DeleteWarehouseUseCase";
import { GetSellsNumberUseCase } from "../useCases/green_repack/GetSellsNumber";
import { GetStockInfoUseCase } from "../useCases/green_repack/GetStockInfoUseCase";
import { GetWarehouseUseCase } from "../useCases/green_repack/GetWarehouseUseCase";
import { RefuseProductUseCase } from "../useCases/green_repack/RefuseProductUseCase";
import { UpdateWarehouseUseCase } from "../useCases/green_repack/UpdateWarehouseUseCase";
import { VerifyAssociationProjectUseCase } from "../useCases/green_repack/VerifyAssociationProjectUseCase";
import { VerifyAssociationUseCase } from "../useCases/green_repack/VerifyAssociationUseCase";

@injectable()
export class GreenRepackController{
    private readonly _verifyAssociationUseCase = new VerifyAssociationUseCase;
    private readonly _createNewMemberUseCase = new CreateNewMemberUseCase;
    private readonly _verifyAssociationProjectUseCase = new VerifyAssociationProjectUseCase;
    private readonly _createWarehouseUseCase = new CreateWarehouseUseCase;
    private readonly _deleteWarehouseUseCase = new DeleteWarehouseUseCase;
    private readonly _updateWarehouseUseCase = new UpdateWarehouseUseCase;
    private readonly _getWarehouseUseCase = new GetWarehouseUseCase;
    private readonly _createPromoCoinsUseCase = new CreatePromoCoinsUseCase;
    private readonly _acceptProductUseCase = new AcceptProductUseCase;
    private readonly _refuseProductUseCase = new RefuseProductUseCase;
    private readonly _getSellsNumberUseCase = new GetSellsNumberUseCase;
    private readonly _getStockInfoUseCase = new GetStockInfoUseCase;

    @inject(TYPES.IAssociationRepository)
    private _associationRepository: IAssociationRepository;
    @inject(TYPES.IGreeRepackRepository)
    private _greenRepackRepository: IGreenRepackRepository;
    @inject(TYPES.IWarehouseRepository)
    private _warehouseRepository: IWarehouseRepository;
    @inject(TYPES.IPromoCoinsRepository)
    private _promoCoinsRepository: IPromoCoinsRepository;
    @inject(TYPES.IProductRepository)
    private _productRepository: IProductRepository;
    @inject(TYPES.IUserRepository)
    private _userReposiory: IUserRepository;

    @inject(TYPES.IPasswordHandler)
    private _passwordHandler: IPasswordHandler;
    @inject(TYPES.IAssociationHandler)
    private _associationHandler: IAssociationHandler;
    @inject(TYPES.IDeliveryTicketHandler)
    private _deliveryTicketHandler: IDeliveryTicketHandler;
    @inject(TYPES.IPaymentHandler)
    private _paymentHandler: IPaymentHandler

    public constructor() {
        autoBind(this)
    }

    public async verifyAssociation(req: any, res: any) {
        try {
            await this._verifyAssociationUseCase.execute(req.body.associationName, this._associationRepository, this._associationHandler)
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
            const {productId, warehouseName} = req.body
            await this._acceptProductUseCase.execute(productId, warehouseName, this._paymentHandler, 
                this._userReposiory, this._productRepository, this._warehouseRepository)
            res.sendStatus(201)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async refuseProduct(req: any, res: any) {
        try {
            const {productId, deliveryFee} = req.body
            await this._refuseProductUseCase.execute(productId, deliveryFee, this._paymentHandler, 
                this._deliveryTicketHandler, this._userReposiory, this._productRepository)
            res.ssendStatus(201)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async getSellsNumber(req: any, res: any) {
        try {
            let sellsNumber = await this._getSellsNumberUseCase.execute(req.body, this._productRepository)
            res.status(200).json(sellsNumber);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async getStockInfo(req: any, res: any) {
        try {
            const {warehouseName, productInfo} = req.body
            let stockInfo = await this._getStockInfoUseCase.execute(warehouseName, productInfo, this._warehouseRepository)
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

    
    public async deleteWarehouse(req: any, res: any) {
        try {
            await this._deleteWarehouseUseCase.execute(req.params.id, this._warehouseRepository)
            res.status(200).json("Deleted");
        } catch(error) {
            console.log(error)
            if(error instanceof NotFoundError){
                res.status(404).json(error.message)
            }else{
                res.status(400).json(error);
            }
        }
    }

    
    public async updateWarehouse(req: any, res: any) {
        try {
            await this._updateWarehouseUseCase.execute(req.body, req.params.id, this._warehouseRepository)
            res.status(200).json("Updated");
        } catch(error) {
            console.log(error)
            if(error instanceof NotFoundError){
                res.status(404).json(error.message)
            }else{
                res.status(400).json(error);
            }
        }
    }
    
    public async getWarehouse(req: any, res: any) {
        try {
            let warehouseDTO = await this._getWarehouseUseCase.execute(req.params.id, this._warehouseRepository)
            res.status(200).json(warehouseDTO);
        } catch(error) {
            console.log(error)
            if(error instanceof NotFoundError){
                res.status(404).json(error.message)
            }else{
                res.status(400).json(error);
            }
        }
    }

    public async createPromo(req: any, res: any) {
        try {
            await this._createPromoCoinsUseCase.execute(req.body, this._promoCoinsRepository)
            res.sendStatus(201)
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
    
}