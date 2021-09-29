import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IMerchantHandler } from "../../interfaces/services/IMerchandHandler";
import { IPasswordHandler } from "../../interfaces/services/IPasswordHandler";

export interface IRegisterUseCase {
    execute(userInfo: unknown, passwordHandler: IPasswordHandler, merchantHandler: IMerchantHandler, repository: IUserRepository): Promise<void>
}