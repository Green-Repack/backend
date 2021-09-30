import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IMerchantHandler } from "../../interfaces/services/IMerchandHandler";
import { IPasswordHandler } from "../../interfaces/services/IPasswordHandler";
import { IPaymentHandler } from "../../interfaces/services/IPaymentHandler";

export interface IRegisterUseCase {
    execute(userInfo: unknown, paymentHandler: IPaymentHandler, passwordHandler: IPasswordHandler, merchantHandler: IMerchantHandler, repository: IUserRepository): Promise<void>
}