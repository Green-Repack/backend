import { GreenRepack } from "../../../domain/entity/GreenRepack";
import { IBaseRepository } from "./IBaseRepositoty";

export interface IGreenRepackRepository extends IBaseRepository<GreenRepack> {
    getMemberByUsername(username: string): Promise<GreenRepack | undefined>
    getExistingMemberCount(firstName: string, lastName: string): Promise<number>
    getGreenRepackMemberById(memberId: string): Promise<GreenRepack | undefined>
    getGreenRepackAdmins(): Promise<GreenRepack[]>
    getAllGreenRepackMembers(): Promise<GreenRepack[]>
}