import { IUserRepository } from "../../interfaces/repository/IUserRepository";

export interface IUpdateUserInfoUseCase {
    execute(userId: string, userInfo: any, userRepository: IUserRepository): Promise<void>
}