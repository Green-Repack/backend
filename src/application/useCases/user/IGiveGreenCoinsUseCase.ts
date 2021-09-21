import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";

export interface IGiveGreenCoinsUseCase {
    execute(requestInfo: unknown, userId: string, associationRepository: IAssociationRepository, userRepository: IUserRepository): Promise<void>
}