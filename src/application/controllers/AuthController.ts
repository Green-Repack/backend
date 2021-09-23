import 'reflect-metadata'
import { inject, injectable } from "inversify";
import { TYPES } from "../commons/types";
import autoBind from "auto-bind"
import { IAssociationRepository } from "../interfaces/repository/IAssociationRepository";
import { IGreenRepackRepository } from "../interfaces/repository/IGreenRepackRepository";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IJwtHandler } from "../interfaces/services/IJwtHandler";
import { IPasswordHandler } from "../interfaces/services/IPasswordHandler";
import { LoginUseCase } from "../useCases/user/LoginUseCase";
import { RegisterUseCase } from "../useCases/user/RegisterUseCase";

@injectable()
export class AuthController{
    private static readonly _registerUseCase = new RegisterUseCase;
    private static readonly _loginUseCase = new LoginUseCase;

    @inject(TYPES.IUserRepository)
    private _userRepository!: IUserRepository;

    @inject(TYPES.IGreeRepackRepository)
    private _greenRepRepository!: IGreenRepackRepository;
    @inject(TYPES.IAssociationRepository)
    private _associationRepository!: IAssociationRepository;

    @inject(TYPES.IJwtHandler)
    private _jwtHandler!: IJwtHandler;
    @inject(TYPES.IPasswordHandler)
    private _passwordHandler!: IPasswordHandler;

    constructor() {
        autoBind(this)
    }

    public async register(req: any, res: any) {
        try {
            await AuthController._registerUseCase.execute(req.body, this._passwordHandler, this._userRepository)
            res.sendStatus(201);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async login(req: any, res: any) {
        try {
            let token = await AuthController._loginUseCase.execute(req.body, this._passwordHandler, this._jwtHandler,
                 this._userRepository, this._greenRepRepository, this._associationRepository)
            res.status(200).json(token);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
}