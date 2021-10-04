import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";
import { IPasswordHandler } from "../../interfaces/services/IPasswordHandler";

export interface ICreateAssociationUseCase {
    execute(associationInfo: unknown, passwordHandler: IPasswordHandler, associationRepository: IAssociationRepository): Promise<void>
}