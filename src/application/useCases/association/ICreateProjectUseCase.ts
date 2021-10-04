import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";

export interface ICreateProjectUseCase {
    execute(associationName: string, projectInfo: unknown, associationRepository: IAssociationRepository): Promise<void>
}