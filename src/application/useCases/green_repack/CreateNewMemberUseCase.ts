import { IGreenRepackDTO } from "../../DTOs/IGreenRepackDTO";
import { ICreateNewMemberUseCase } from "./ICreateMemberUseCase";
import { IGreenRepackRepository } from "../../../application/interfaces/repository/IGreenRepackRepository";
import { Guard } from "../../commons/Guard";
import { GreenRepack } from "../../../domain/entity/GreenRepack";


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
            
            let newUser = GreenRepack.createGreenRepackMember(memberInfo)
            await this._greenRepackRepository.save(newUser)
            return memberInfo.username
        } catch(error) {
            throw error
        }
    }
}