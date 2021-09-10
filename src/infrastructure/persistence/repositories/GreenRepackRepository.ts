import { GreenRepackMap } from "../../../application/green_repack/mappers/GreenRepackMap";
import { GreenRepack } from "../../../domain/entity/GreenRepack";
import { IGreenRepackRepository } from "../../../domain/interface/green_repack/IGreenRepackRepository";
import { GreenRepackModel } from "../schemas/GreenRepack";

export class GreenRepackRepository implements IGreenRepackRepository {
    async getMemberByUsername(username: string): Promise<GreenRepack | undefined> {
        let member = await GreenRepackModel.findOne({username: username})
        if (member) return GreenRepackMap.toDomain(member)
        else return undefined
    }
    async getExistingMemberCount(firstName: string, lastName: string): Promise<number> {
        let members = await GreenRepackModel.count({firstName: firstName, lastName: lastName})
        return members
    }

    async getGreenRepackMemberById(memberId: string): Promise<GreenRepack | undefined> {
        let member = await GreenRepackModel.findById(memberId)
        if (member) return GreenRepackMap.toDomain(member)
        else return undefined
    }

    async getGreenRepackAdmins(): Promise<GreenRepack[]> {
        let result: GreenRepack[] = new Array<GreenRepack>()
        let members = await GreenRepackModel.find({admin: true})
        for(var member of members) {
            result.push(GreenRepackMap.toDomain(member))
        }
        return result
    }

    async getAllGreenRepackMembers(): Promise<GreenRepack[]> {
        let result: GreenRepack[] = new Array<GreenRepack>()
        let members = await GreenRepackModel.find({})
        for(var member of members) {
            result.push(GreenRepackMap.toDomain(member))
        }
        return result
    }

    async exists(idOrUsername: string): Promise<boolean> {
        let usernameResult = await GreenRepackModel.findOne({userame: idOrUsername})
        if (usernameResult == null) {
            try {
                let idResult = await GreenRepackModel.findById(idOrUsername)
                if (idResult == null)  return false
                else return true
            } catch(error) {
                return false
            }
        } else {
            return true
        }
    }

    async delete(memberId: string): Promise<void> {
        await GreenRepackModel.findByIdAndDelete(memberId)
    }

    async save(member: GreenRepack): Promise<void> {
        let exists = await this.exists(member.username)
        const rawUserData = GreenRepackMap.toPersistence(member)

        if (exists) {
            const mongooseMember = await GreenRepackModel.findOne({username: member.username})
            if (mongooseMember) await mongooseMember.updateOne(rawUserData)
        } else {
            await GreenRepackModel.create(rawUserData)
        }
    }
}