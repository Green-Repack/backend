import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";

export interface IVerifyAssociationProjectUseCase {
    execute(associationName: string, projectName: string, associationRepository: IAssociationRepository): Promise<void>
}