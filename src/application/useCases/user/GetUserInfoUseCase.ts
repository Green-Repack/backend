import { Guard } from "../../commons/Guard";
import { IUserDTO } from "../../DTOs/IUserDTO";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { UserMap } from "../../mappers/UserMap";
import { IGetUserInfoUseCase } from "./IGetUserInfoUseCase";
import { NotFoundError } from "../../errors/NotFoundError";

export class GetUserInfoUseCase implements IGetUserInfoUseCase {
    async execute(userId: string, userRepository: IUserRepository): Promise<IUserDTO> {
        try {
            Guard.AgainstNullOrUndefined(userId, "User id is required")
            let user = await userRepository.getUserById(userId)
            if (user == undefined) throw new NotFoundError("User not found")

            let userDTO = UserMap.toDTO(user)
            return userDTO
        } catch (error) {
            throw error
        }
    }
}