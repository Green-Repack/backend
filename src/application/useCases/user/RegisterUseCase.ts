import { IRegisterUseCase } from "./IRegisterUseCase";
import { Guard } from "../../commons/Guard";
import { IPasswordHandler } from "../../interfaces/services/IPasswordHandler";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { UserMap } from "../../mappers/UserMap";
import { AlreadyExistsError } from "../../errors/AlreadyExistsError";
import { IUserDTO } from "../../DTOs/IUserDTO";
import { IUserOrders } from "../../../domain/entityProperties/IUserOrders";
import { IProductSold } from "../../../domain/entityProperties/IProductSold";
import axios,{AxiosResponse} from "axios";

export class RegisterUseCase  implements IRegisterUseCase {
    public async execute(userInfo: any, passwordHandler: IPasswordHandler, repository: IUserRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(userInfo.firstName, "first name required")
            Guard.AgainstNullOrUndefined(userInfo.lastName, "last name required")
            Guard.AgainstNullOrUndefined(userInfo.email, "email required")
            Guard.AgainstInvalidEmail(userInfo.email, "invalid email")
            Guard.AgainstNullOrUndefined(userInfo.address, "address required")
            Guard.AgainstNullOrUndefined(userInfo.password, "password required")

            let userDTO: IUserDTO = {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
                address: userInfo.address,
                password: "",
                orders: new Array<IUserOrders>(),
                greenCoins: {amount: 0, expireDate: new Date()},
                merchant: await this.isMerchant(userInfo.siren, userInfo.siret),
                creationDate: new Date()
            }

            if (userDTO.merchant) userDTO.productSold = new Array<IProductSold>()

            userDTO.password = await passwordHandler.generatePasswordHash(userInfo.password)
        
            let userExists = await repository.exists(userDTO.email);
            
            if (userExists) throw new AlreadyExistsError("The use already exists")
            
            let newUser = UserMap.toDomain(userDTO)
            await repository.save(newUser)
        } catch(error) {
            throw error
        }
    }

    private async isMerchant(siren?: string, siret?: string): Promise<boolean> {
        if(siret){
            let response: AxiosResponse = await axios.get("https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/"+siret)
            return response.status == 200;
        }
        else if(siren){
            let response: AxiosResponse = await axios.get("https://entreprise.data.gouv.fr/api/sirene/v1/siren/"+siret)
            return response.status == 200;
        }
        return false
    }
}
