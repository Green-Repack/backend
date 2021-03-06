import { IAssociationRepository } from "../interfaces/repository/IAssociationRepository";
import { IPasswordHandler } from "../interfaces/services/IPasswordHandler";
import { CreateActionUseCase } from "../useCases/association/CreateActionUseCase";
import { CreateAssociatonUseCase } from "../useCases/association/CreateAssciationUseCase";
import { CreateProjectUseCase } from "../useCases/association/CreateProjectUseCase";
import { GetInfoUseCase } from "../useCases/association/GetInfoUseCase";
import autoBind from "auto-bind"
import { inject, injectable } from "inversify";
import { TYPES } from "../commons/types";
import { getAllAssociationUseCase } from "../useCases/association/GetAllAssociationsUseCase";

@injectable()
export class AssociationController{
    private readonly _createAssociationUseCase = new CreateAssociatonUseCase;
    private readonly _getInfoUseCase = new GetInfoUseCase;
    private readonly _createProjectUseCase = new CreateProjectUseCase;
    private readonly _createActionUseCase = new CreateActionUseCase;
    private readonly _getAllAssocationsUseCase = new getAllAssociationUseCase;

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
            res.status(400).json({ error: error.message });
        }
    }

    public async createProject(req: any, res: any) {
        try {
            await this._createProjectUseCase.execute(req.userId, req.body, this._associationRepository)
            res.sendStatus(201);
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    }

    public async createAction(req: any, res: any) {
        try {
            const {projectName, actionInfo} = req.body
            await this._createActionUseCase.execute(req.userId, projectName, actionInfo, this._associationRepository)
            res.sendStatus(201);
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async getInfo(req: any, res: any) {
        try {
            let associationDTO = await this._getInfoUseCase.execute(req.userId, this._associationRepository)
            res.status(200).json(associationDTO);
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }

    public async getAllAssociations(req: any, res: any) {
        try {
            let associationsDTO = await this._getAllAssocationsUseCase.execute(this._associationRepository)
            res.status(200).json(associationsDTO);
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }
}