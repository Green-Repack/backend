import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IPasswordHandler } from "../../interfaces/services/IPasswordHandler";

export interface IRegisterUseCase {
    execute(userInfo: unknown, passwordHandler: IPasswordHandler, repository: IUserRepository): Promise<void>
}