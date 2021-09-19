import { ICreateNewMemberUseCase } from "./ICreateMemberUseCase";
import { IGreenRepackRepository } from "../../../application/interfaces/repository/IGreenRepackRepository";
import { Guard } from "../../commons/Guard";
import { GreenRepack } from "../../../domain/entity/GreenRepack";
import { IPasswordHandler } from "../../interfaces/services/IPasswordHandler";
import { IUserDTO } from "../../DTOs/IUserDTO";
import { IGreenRepackDTO } from "../../DTOs/IGreenRepackDTO";
import { GreenRepackMap } from "../../mappers/GreenRepackMap";


export class CreateNewMemberUseCase  implements ICreateNewMemberUseCase {
    public async execute(memberInfo: any, passwordHandler: IPasswordHandler, greenRepackRepository: IGreenRepackRepository): Promise<string> {
        try {
            Guard.AgainstNullOrUndefined(memberInfo.firstName, "first name required")
            Guard.AgainstNullOrUndefined(memberInfo.lastName, "last name required")

            let newGreenRepackDTO: IGreenRepackDTO = {
                firstName: memberInfo.firstName,
                lastName: memberInfo.lastName,
                username: "",
                password: "",
                admin: memberInfo.admin,
                creationDate: new Date()
            }

            let count = await greenRepackRepository.getExistingMemberCount(memberInfo.firstName, memberInfo.lastName);
            if (count > 0) {
                newGreenRepackDTO.username = memberInfo.firstName[0] + memberInfo.lastName + count
            } else {
                newGreenRepackDTO.username = memberInfo.firstName[0] + memberInfo.lastName
            }
            
            newGreenRepackDTO.password = passwordHandler.generatePasswordHash(memberInfo.password)

            let greenRepackMember = GreenRepackMap.toDomain(newGreenRepackDTO)
            await greenRepackRepository.save(greenRepackMember)
            return newGreenRepackDTO.username!
        } catch(error) {
            throw error
        }
    }
}