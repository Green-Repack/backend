import { GreenRepack } from "../../entity/GreenRepack";
import { Repository } from "../Repository";

export interface IAssociationRepository extends Repository<GreenRepack> {
    getGreenRepackMemberById(memberId: string): Promise<GreenRepack>
    getGreenRepackAdmins(): Promise<GreenRepack[]>
    getAllGreenRepackMembers(): Promise<GreenRepack[]>
}
