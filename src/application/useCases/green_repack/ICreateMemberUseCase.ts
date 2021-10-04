import { IGreenRepackRepository } from "../../interfaces/repository/IGreenRepackRepository";
import { IPasswordHandler } from "../../interfaces/services/IPasswordHandler";

export interface ICreateNewMemberUseCase {
    execute(memberInfo: any, passwordHandler: IPasswordHandler, greenRepackRepository: IGreenRepackRepository): Promise<string>
}