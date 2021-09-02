import { IUserRepository } from "../../../../domain/interface/user/IUserRepository";
import { IProduitDTO } from "../../dto/IProduitDTO";
import { ISellUseCase } from "./ISellUseCase";

export class SellUseCase  implements ISellUseCase {
    private _userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository
    }
    execute(userId: string, product: IProduitDTO): void {
        throw new Error("Method not implemented.");
    }
    
}