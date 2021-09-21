import { IAssociationRepository } from "../interfaces/repository/IAssociationRepository";
import { IGreenRepackRepository } from "../interfaces/repository/IGreenRepackRepository";
import { IProductRepository } from "../interfaces/repository/IProductRepository";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IWarehouseRepository } from "../interfaces/repository/IWarehouseRepository";
import { IAssociationHandler } from "../interfaces/services/IAssociationHandler";
import { IPasswordHandler } from "../interfaces/services/IPasswordHandler";
import { CreateNewMemberUseCase } from "../useCases/green_repack/CreateNewMemberUseCase";
import { CreateWarehouseUseCase } from "../useCases/green_repack/CreateWarehouseUseCase";
import { VerifyAssociationProjectUseCase } from "../useCases/green_repack/VerifyAssociationProject";
import { VerifyAssociationUseCase } from "../useCases/green_repack/VerifyAssociationUseCase";
import { BaseController } from "./BaseController";

export class GreenRepackController extends BaseController{
    private readonly _verifyAssociationUseCase = new VerifyAssociationUseCase;
    private readonly _createNewMemberUseCase = new CreateNewMemberUseCase;
    private readonly _verifyAssociationProjectUseCase = new VerifyAssociationProjectUseCase;
    private readonly _createWarehouseUseCase = new CreateWarehouseUseCase;

    private _associationRepository: IAssociationRepository;
    private _greenRepackRepository: IGreenRepackRepository;
    private _warehouseRepository: IWarehouseRepository;
    private _productRepository: IProductRepository;
    private _userReposiory: IUserRepository;

    private _passwordHandler: IPasswordHandler;
    private _associationHandler: IAssociationHandler;

    public constructor(greenRepackRepository: IGreenRepackRepository, associatioRepostory: IAssociationRepository, userRepository: IUserRepository,
        warehouseRepository: IWarehouseRepository, productRepository: IProductRepository ,passwordHandler: IPasswordHandler, associationHandler: IAssociationHandler) {
            super();
            this._associationRepository = associatioRepostory
            this._greenRepackRepository = greenRepackRepository
            this._productRepository = productRepository
            this._warehouseRepository = warehouseRepository
            this._userReposiory = userRepository
            this._passwordHandler = passwordHandler
            this._associationHandler = associationHandler
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


    public async createWarehouse(req: any, res: any) {
        try {
            let warehouseDTO = await this._createWarehouseUseCase.execute(req.body, this._warehouseRepository)
            res.status(201).json(warehouseDTO);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
}