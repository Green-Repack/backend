import { Guard } from "../../commons/Guard";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { UserMap } from "../../mappers/UserMap";
import { IUpdateUserInfoUseCase } from "./IUpdateUserInfoUseCase";

export class UpdateUserInfoUseCase implements IUpdateUserInfoUseCase {
    async execute(userId: string, userInfo: any, userRepository: IUserRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(userId, "User id is required")

            let user = await userRepository.getUserById(userId)
            if (user == undefined) throw new NotFoundError("User not found")

            let userDTO = UserMap.toDTO(user)

            if (userInfo.firstName != undefined) userDTO.firstName = userInfo.firstName
            if (userInfo.lastName != undefined) userDTO.lastName = userInfo.lastName
            if (userInfo.password != undefined) userDTO.password = userInfo.password

            await userRepository.save(UserMap.toDomain(userDTO))
        } catch (error) {
            throw error
        }
    }
}