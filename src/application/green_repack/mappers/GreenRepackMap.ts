import { createRequire } from "module"
import { GreenRepack } from "../../../domain/entity/GreenRepack"
import { IGreenRepackDTO } from "../dto/IGreenRepackDTO"

export class GreenRepackMap {
    public static toDTO(member: GreenRepack): IGreenRepackDTO {
        return {
            id: member.id,
            firstName: member.firstName,
            lastName: member.lastName,
            username: member.username,
            password: member.password,
            admin: member.isAdmin(),
            creationDate: member.creationDate
        }
    }

    public static toDomain(member: any): GreenRepack {
        return GreenRepack.createGreenRepackMember({
            firstName: member.firstName,
            lastName: member.lastName,
            username: member.username,
            password: member.password,
            admin: member.admin,
            creationDate: member.creationDate
        }, member.id)
    }

    public static toPersistence(member: GreenRepack): any {
        return {
            id: member.id,
            firstName: member.firstName,
            lastName: member.lastName,
            username: member.username,
            password: member.password,
            admn: member.isAdmin(),
            creationDate: member.creationDate
        }
    }
}