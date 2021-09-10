import { GreenRepack } from "../../../domain/entity/GreenRepack"
import { Guard } from "../../commons/Guard"
import { IGreenRepackDTO } from "../dto/IGreenRepackDTO"
import bcrypt from "bcryptjs"
import { GreenRepackMap } from "../mappers/GreenRepackMap"

export class CreateNewMemberService {
    public static async create(memberInfo: IGreenRepackDTO): Promise<GreenRepack> {
        Guard.AgainstNullOrUndefined(memberInfo.password, "password required")

        const hash = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(memberInfo.password, hash);
        memberInfo.password = hashPassword
        memberInfo.creationDate = new Date()

        let newMember= GreenRepackMap.toDomain(memberInfo)
        
        return newMember
    }
}