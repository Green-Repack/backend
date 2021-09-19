import { IAssociationHandler } from "../../application/interfaces/services/IAssociationHandler";

export class AssociaionHandler implements IAssociationHandler {
    async verify(name?: string, siret?: string, numRNA?: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}