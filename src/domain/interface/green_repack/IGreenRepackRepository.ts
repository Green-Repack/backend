import { GreenRepack } from "../../entity/GreenRepack";
import { Repository } from "../Repositoty";

export interface IGreenRepackRepository extends Repository<GreenRepack> {
    getMemberByUsername(username: string): Promise<GreenRepack | undefined>
    getExistingMemberCount(firstName: string, lastName: string): Promise<number>
    getGreenRepackMemberById(memberId: string): Promise<GreenRepack | undefined>
    getGreenRepackAdmins(): Promise<GreenRepack[]>
    getAllGreenRepackMembers(): Promise<GreenRepack[]>
}