import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IMerchantHandler } from "../../interfaces/services/IMerchandHandler";
import { IPasswordHandler } from "../../interfaces/services/IPasswordHandler";
import { IStripeHandler } from "../../interfaces/services/IStripeHandler";

export interface IRegisterUseCase {
    execute(userInfo: unknown, paymentHandler: IStripeHandler, passwordHandler: IPasswordHandler, merchantHandler: IMerchantHandler, repository: IUserRepository): Promise<string>
}