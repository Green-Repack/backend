import { IGreenRepackDTO } from "../../dto/IGreenRepackDTO";
import { CreateNewMemberService } from "../../services/CreateNewMemberService";
import { ICreateNewMemberUseCase } from "./ICreateNewMemberUseCase";
import { IGreenRepackRepository } from "../../../../domain/interface/green_repack/IGreenRepackRepository";
import { Guard } from "../../../commons/Guard";


export class CreateNewMemberUseCase  implements ICreateNewMemberUseCase {
    private _greenRepackRepository: IGreenRepackRepository

    constructor(greenRepackRepository: IGreenRepackRepository) {
        this._greenRepackRepository = greenRepackRepository
    }

    public async execute(memberInfo: IGreenRepackDTO): Promise<string> {
        try {
            Guard.AgainstNullOrUndefined(memberInfo.firstName, "first name required")
            Guard.AgainstNullOrUndefined(memberInfo.lastName, "last name required")

            let count = await this._greenRepackRepository.getExistingMemberCount(memberInfo.firstName, memberInfo.lastName);
            if (count > 0) {
                memberInfo.username = memberInfo.firstName[0] + memberInfo.lastName + count
            } else {
                memberInfo.username = memberInfo.firstName[0] + memberInfo.lastName
            }
            
            let newUser = await CreateNewMemberService.create(memberInfo)
            await this._greenRepackRepository.save(newUser)
            return memberInfo.username
        } catch(error) {
            throw error
        }
    }
}