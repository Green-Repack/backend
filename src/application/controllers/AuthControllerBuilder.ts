import { IAssociationRepository } from "../interfaces/repository/IAssociationRepository";
import { IGreenRepackRepository } from "../interfaces/repository/IGreenRepackRepository";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IJwtHandler } from "../interfaces/services/IJwtHandler";
import { IPasswordHandler } from "../interfaces/services/IPasswordHandler";
import { AuthController } from "./AuthController";

export class AuthControllerBuilder {
    private _userRepository!: IUserRepository;
    private _greenRepRepository!: IGreenRepackRepository;
    private _associationRepository!: IAssociationRepository;

    private _jwtHandler!: IJwtHandler;
    private _passwordHandler!: IPasswordHandler;

    public constructor() {}

    get userRepository() {
        return this._userRepository
    }

    setUserRepository(repo: IUserRepository): AuthControllerBuilder {
        this._userRepository = repo
        return this
    }

    get greenRepRepository() {
        return this._greenRepRepository
    }

    setGreenRepRepository(repo: IGreenRepackRepository): AuthControllerBuilder {
        this._greenRepRepository = repo
        return this
    }

    get associationRepository() {
        return this._associationRepository
    }

    setAssociatioRepository(repo: IAssociationRepository): AuthControllerBuilder {
        this._associationRepository = repo
        return this
    }

    get jwtHandler() {
        return this._jwtHandler
    }

    setJwtHandler(handler: IJwtHandler): AuthControllerBuilder{
        this._jwtHandler = handler
        return this
    }

    get passwordHandler() {
        return this._passwordHandler
    }

    setPassworldHandler(handler: IPasswordHandler): AuthControllerBuilder{
        this._passwordHandler = handler
        return this
    }

    public build(): AuthController {
        return new AuthController(this)
    }
}