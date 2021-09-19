import { IBaseRepository } from "./IBaseRepositoty";
import { Assocation } from "../../../domain/entity/Association";

export interface IAssociationRepository extends IBaseRepository<Assocation> {
    getAssociationByLoginId(loginId: string): Promise<Assocation | undefined>
    getAssociationById(associationId: string): Promise<Assocation | undefined>
    getAssociationByName(name: string): Promise<Assocation | undefined>
    getProduitByVerification(verified: boolean): Promise<Assocation[]>
    getAllAssociation(): Promise<Assocation[]>
}