import { Assocation } from "../../../domain/entity/Association";
import { IAssociationRepository } from "../../../application/interfaces/repository/IAssociationRepository";

export class AssociationRepository implements IAssociationRepository {
    getAssociationByLoginId(loginId: string): Promise<Assocation | undefined> {
        throw new Error("Method not implemented.");
    }
    getAssociationById(associationId: string): Promise<Assocation> {
        throw new Error("Method not implemented.");
    }
    getAssociationByName(name: string): Promise<Assocation> {
        throw new Error("Method not implemented.");
    }
    getProduitByVerification(verified: boolean): Promise<Assocation[]> {
        throw new Error("Method not implemented.");
    }
    getAllAssociation(): Promise<Assocation[]> {
        throw new Error("Method not implemented.");
    }
    exists(idOrEmailOrUsername: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(t: Assocation): Promise<void> {
        throw new Error("Method not implemented.");
    }
    save(t: Assocation): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}