import { UserRepository } from "../../infrastructure/persistence/repositories/UserRepository";
import { IAssociationRepository } from "../interfaces/repository/IAssociationRepository";
import { IGreenRepackRepository } from "../interfaces/repository/IGreenRepackRepository";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IJwtHandler } from "../interfaces/services/IJwtHandler";
import { IPasswordHandler } from "../interfaces/services/IPasswordHandler";
import { LoginUseCase } from "../useCases/user/LoginUseCase";
import { RegisterUseCase } from "../useCases/user/RegisterUseCase";
import { BaseController } from "./BaseController";

export class AuthController extends BaseController{
    private readonly _registerUseCase = new RegisterUseCase;
    private readonly _loginUseCase = new LoginUseCase;

    private _userRepository: IUserRepository;
    private _greenRepRepository: IGreenRepackRepository;
    private _associationRepository: IAssociationRepository;

    private _jwtHandler: IJwtHandler;
    private _passwordHandler: IPasswordHandler;

    public constructor(userRepo: IUserRepository, greenRepRepo: IGreenRepackRepository, assoRepo: IAssociationRepository,
        jwtHandler: IJwtHandler, passwordHandler: IPasswordHandler) {
        super();
            this._userRepository = userRepo
            this._greenRepRepository = greenRepRepo
            this._associationRepository = assoRepo

            this._jwtHandler = jwtHandler
            this._passwordHandler = passwordHandler
    }
    

    public async register(req: any, res: any) {
        try {
            await this._registerUseCase.execute(req.body, this._passwordHandler, this._userRepository)
            res.sendStatus(201);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }

    public async login(req: any, res: any) {
        try {
            let token = await this._loginUseCase.execute(req.body, this._passwordHandler, this._jwtHandler,
                 this._userRepository, this._greenRepRepository, this._associationRepository)
            res.status(200).json(token);
        } catch(error) {
            console.log(error)
            res.status(400).json(error);
        }
    }
}