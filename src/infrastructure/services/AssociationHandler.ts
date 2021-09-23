import { injectable } from "inversify";
import { IAssociationHandler } from "../../application/interfaces/services/IAssociationHandler";

@injectable()
export class AssociaionHandler implements IAssociationHandler {
    async verify(name?: string, siret?: string, numRNA?: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}