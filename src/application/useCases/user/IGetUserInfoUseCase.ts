import { IUserDTO } from "../../DTOs/IUserDTO";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";

export interface IGetUserInfoUseCase {
    execute(userId: string, userRepository: IUserRepository): Promise<IUserDTO>
}