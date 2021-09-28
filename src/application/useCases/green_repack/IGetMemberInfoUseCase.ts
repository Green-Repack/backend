import { IGreenRepackDTO } from "../../DTOs/IGreenRepackDTO";
import { IGreenRepackRepository } from "../../interfaces/repository/IGreenRepackRepository";

export interface IGetMemberInfoUseCase {
    execute(userId: string, greenRepackRepository: IGreenRepackRepository): Promise<IGreenRepackDTO>
}