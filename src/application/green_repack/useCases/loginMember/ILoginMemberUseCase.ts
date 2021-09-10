import { IGreenRepackDTO } from "../../dto/IGreenRepackDTO";

export interface ILoginMemberUseCase {
    execute(email: string, password: string): Promise<IGreenRepackDTO>
}