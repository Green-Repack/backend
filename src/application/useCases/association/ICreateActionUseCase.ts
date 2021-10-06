import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";

export interface ICreateActionUseCase {
    execute(associationId: string, projectName: string, actionInfo: unknown, associationRepository: IAssociationRepository): Promise<void>
}