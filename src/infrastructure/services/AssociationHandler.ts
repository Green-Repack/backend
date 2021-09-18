import { IAssociationHandler } from "../../application/interfaces/services/IAssociationHandler";

export class AssociaionHandler implements IAssociationHandler {
    verify(name?: string, siret?: string, numRNA?: string): boolean {
        throw new Error("Method not implemented.");
    }
    
}