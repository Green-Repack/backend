import { Guard } from "../../commons/Guard";
import { IGreenRepackDTO } from "../../DTOs/IGreenRepackDTO";
import { IGreenRepackRepository } from "../../interfaces/repository/IGreenRepackRepository";
import { GreenRepackMap } from "../../mappers/GreenRepackMap";
import { IGetMemberInfoUseCase } from "./IGetMemberInfoUseCase";
import { NotFoundError } from "../../errors/NotFoundError";

export class GetMemberInfoUseCase implements IGetMemberInfoUseCase {
    async execute(userId: string, greenRepackRepository: IGreenRepackRepository): Promise<IGreenRepackDTO> {
        try {
            Guard.AgainstNullOrUndefined(userId, "User id is required")
            let member = await greenRepackRepository.getGreenRepackMemberById(userId)
            if (member == undefined) throw new NotFoundError("User not found")

            let memberDTO = GreenRepackMap.toDTO(member)
            return memberDTO
        } catch (error) {
            throw error
        }
    }
    
}