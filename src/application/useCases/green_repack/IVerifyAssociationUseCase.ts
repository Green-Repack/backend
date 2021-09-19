import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";
import { IAssociationHandler } from "../../interfaces/services/IAssociationHandler";

export interface IVerifyAssociationUseCase {
    execute(associationName: string, associationRepository: IAssociationRepository, associationHandler: IAssociationHandler): Promise<void>
}