import { IRegisterUseCase } from "./IRegisterUseCase";
import { Guard } from "../../commons/Guard";
import { IPasswordHandler } from "../../interfaces/services/IPasswordHandler";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { UserMap } from "../../mappers/UserMap";
import { AlreadyExistsError } from "../../errors/AlreadyExistsError";
import { IUserDTO } from "../../DTOs/IUserDTO";
import { IUserOrders } from "../../../domain/entityProperties/IUserOrders";
import { IProductSold } from "../../../domain/entityProperties/IProductSold";
import { IMerchantHandler } from "../../interfaces/services/IMerchandHandler";
import { IStripeHandler } from "../../interfaces/services/IStripeHandler";

export class RegisterUseCase  implements IRegisterUseCase {
    public async execute(userInfo: any, stripeHandler: IStripeHandler, passwordHandler: IPasswordHandler, merchantHandler: IMerchantHandler,
         repository: IUserRepository): Promise<string> {
        try {
            Guard.AgainstNullOrUndefined(userInfo.firstName, "first name required")
            Guard.AgainstNullOrUndefined(userInfo.lastName, "last name required")
            Guard.AgainstNullOrUndefined(userInfo.email, "email required")
            Guard.AgainstInvalidEmail(userInfo.email, "invalid email")
            Guard.AgainstNullOrUndefined(userInfo.address, "address required")
            Guard.AgainstNullOrUndefined(userInfo.password, "password required")

            let merchant = false
            let accountLinkUrl = "" 
            let sirenExists = await merchantHandler.verifyMerchantBySiren(userInfo.siren)
            let siretExists = await merchantHandler.verifyMerchantBySiret(userInfo.siret)
            if (sirenExists || siretExists) merchant = true

            let userDTO: IUserDTO = {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
                address: userInfo.address,
                password: "",
                orders: new Array<IUserOrders>(),
                greenCoins: {amount: 0, expireDate: new Date()},
                merchant: merchant,
                creationDate: new Date()
            }

            userDTO.stripeCustomerId = await stripeHandler.createStripeCustomer(userDTO)
            if (userDTO.merchant) {
                userDTO.productSold = new Array<IProductSold>()
                userDTO.stripeAccountId = await stripeHandler.createStripeAccount(userDTO)
                accountLinkUrl = await stripeHandler.createStripeAccountLink(userDTO)
            }

            userDTO.password = await passwordHandler.generatePasswordHash(userInfo.password)
        
            let userExists = await repository.exists(userDTO.email);
            
            if (userExists) throw new AlreadyExistsError("The use already exists")
            
            let newUser = UserMap.toDomain(userDTO)
            await repository.save(newUser)
            return accountLinkUrl
        } catch(error) {
            throw error
        }
    }
}