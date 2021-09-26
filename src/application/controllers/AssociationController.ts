import { IAssociationRepository } from "../interfaces/repository/IAssociationRepository";
import { IPasswordHandler } from "../interfaces/services/IPasswordHandler";
import { CreateActionUseCase } from "../useCases/association/CreateActionUseCase";
import { CreateAssociatonUseCase } from "../useCases/association/CreateAssciationUseCase";
import { CreateProjectUseCase } from "../useCases/association/CreateProjectUseCase";
import { GetInfoUseCase } from "../useCases/association/GetInfoUseCase";
import autoBind from "auto-bind"
import { inject, injectable } from "inversify";
import { TYPES } from "../commons/types";

@injectable()
export class AssociationController{
    private readonly _createAssociationUseCase = new CreateAssociatonUseCase;
    private readonly _getInfoUseCase = new GetInfoUseCase;
    private readonly _createProjectUseCase = new CreateProjectUseCase;
    private readonly _createActionUseCase = new CreateActionUseCase;

    @inject(TYPES.IAssociationRepository)
    private _associationRepository!: IAssociationRepository;

    @inject(TYPES.IPasswordHandler)
    private _passwordHandler!: IPasswordHandler;

    public constructor() {
        autoBind(this);
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
            await this._createProjectUseCase.execute(req.body, this._associationRepository)
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
            let associationDTO = await this._getInfoUseCase.execute(req.body.name, this._associationRepository)
            res.status(200).json(associationDTO);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
}