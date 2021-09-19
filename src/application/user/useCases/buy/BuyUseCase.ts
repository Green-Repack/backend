import { IProductDTO } from "../../dto/IProductDTO";
import { IBuyUseCase } from "./IBuyUseCase";
import { IUserRepository } from '../../../../domain/interface/user/IUserRepository'

export class BuyUseCase  implements IBuyUseCase {
    private _userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository
    }

    execute(userId: string, panier: IProductDTO): void {
        throw new Error("Method not implemented.");
    }
    
}