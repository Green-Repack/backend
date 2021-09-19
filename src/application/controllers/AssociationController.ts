import { IAssociationRepository } from "../interfaces/repository/IAssociationRepository";
import { IPasswordHandler } from "../interfaces/services/IPasswordHandler";
import { CreateActionUseCase } from "../useCases/association/CreateActionUseCase";
import { CreateAssociatonUseCase } from "../useCases/association/CreateAssciationUseCase";
import { CreateProjectUseCase } from "../useCases/association/CreateProjectUseCase";
import { GetInfoUseCase } from "../useCases/association/GetInfoUseCase";
import { BaseController } from "./BaseController";

export class AssociationController extends BaseController{
    private readonly _createAssociationUseCase = new CreateAssociatonUseCase;
    private readonly _getInfoUseCase = new GetInfoUseCase;
    private readonly _createProjectUseCase = new CreateProjectUseCase;
    private readonly _createActionUseCase = new CreateActionUseCase;

    private _associationRepository: IAssociationRepository;

    private _passwordHandler: IPasswordHandler;

    public constructor( associatioRepostory: IAssociationRepository, passwordHandler: IPasswordHandler) {
            super();
            this._associationRepository = associatioRepostory
            this._passwordHandler = passwordHandler
    }

    public async createAssociation(req: any, res: any) {
        try {
            await this._createAssociationUseCase.execute(req.body, this._passwordHandler, this._associationRepository)
            res.sendStatus(201);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async createProject(req: any, res: any) {
        try {
            const {associationName, projectInfo} = req.body
            await this._createProjectUseCase.execute(associationName, projectInfo, this._associationRepository)
            res.sendStatus(201);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async createAction(req: any, res: any) {
        try {
            const {associationName, projectName, actionInfo} = req.body
            await this._createActionUseCase.execute(associationName, projectName, actionInfo, this._associationRepository)
            res.sendStatus(201);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async getInfo(req: any, res: any) {
        try {
            await this._getInfoUseCase.execute(req.body.name, this._associationRepository)
            res.sendStatus(200);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
}