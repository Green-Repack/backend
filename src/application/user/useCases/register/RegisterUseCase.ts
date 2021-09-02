import { IUserRepository } from "../../../../domain/interface/user/IUserRepository";
import { IUserDTO } from "../../dto/IUserDTO";
import { IRegisterUseCase } from "./IRegisterUseCase";

export class RegisterUseCase  implements IRegisterUseCase {
    private _userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository
    }
    
    async execute(userInfo: IUserDTO): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}