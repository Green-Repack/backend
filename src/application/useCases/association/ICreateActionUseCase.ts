import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";

export interface ICreateActionUseCase {
    execute(associationName: string, projectName: string, actionInfo: unknown, associationRepository: IAssociationRepository): Promise<void>
}