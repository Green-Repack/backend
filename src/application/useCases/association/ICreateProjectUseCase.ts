import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";

export interface ICreateProjectUseCase {
    execute(associationId: string, projectInfo: unknown, associationRepository: IAssociationRepository): Promise<void>
}