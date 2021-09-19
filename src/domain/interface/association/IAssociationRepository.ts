import { Repository } from "../Repository";
import { Assocation } from "../../entity/Association";

export interface IAssociationRepository extends Repository<Assocation> {
    getAssociationById(associationId: string): Promise<Assocation>
    getAssociationByName(name: string): Promise<Assocation>
    getProduitByVerification(verified: boolean): Promise<Assocation[]>
    getAllAssociation(): Promise<Assocation[]>
}
