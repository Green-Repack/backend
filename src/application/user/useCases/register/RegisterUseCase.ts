import { IUserRepository } from "../../../../domain/interface/user/IUserRepository";
import { IUserDTO } from "../../dto/IUserDTO";
import { UserAlreadyExistsError } from "../../errors/UserAlreadyExistsError";
import { CreateUserService } from "../../services/CreateUserService";
import { IRegisterUseCase } from "./IRegisterUseCase";

export class RegisterUseCase  implements IRegisterUseCase {
    private _userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository
    }

    public async execute(userInfo: IUserDTO): Promise<void> {
        try {
            let userExists = await this._userRepository.exists(userInfo.email);

            if (userExists) throw new UserAlreadyExistsError()

            let newUser = await CreateUserService.create(userInfo)
            await this._userRepository.save(newUser)
        } catch(error) {
            throw error
        }
    }
}