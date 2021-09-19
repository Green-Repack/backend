import { IUserRepository } from "../../../../domain/interface/user/IUserRepository";
import { IUserDTO } from "../../dto/IUserDTO";
import { ILoginUseCase } from "./ILoginUseCase";

export class LoginUseCase  implements ILoginUseCase {
    private _userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository
    }
    
    async execute(email: string, password: string): Promise<IUserDTO> {
        throw new Error("Method not implemented.");
    }

}