import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";
import { IGreenRepackRepository } from "../../interfaces/repository/IGreenRepackRepository";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { IJwtHandler } from "../../interfaces/services/IJwtHandler";
import { IPasswordHandler } from "../../interfaces/services/IPasswordHandler";

export interface ILoginUseCase {
    execute(credentials: any, passwordHandler: IPasswordHandler, jwtHandler: IJwtHandler,
        userRepository: IUserRepository, greenRepRepository: IGreenRepackRepository, 
        assoRepository: IAssociationRepository, ): Promise<{[token: string]: string}>
}