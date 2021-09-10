import { IGreenRepackDTO } from "../../dto/IGreenRepackDTO";

export interface ICreateNewMemberUseCase {
    execute(memberInfo: IGreenRepackDTO): Promise<string>
}