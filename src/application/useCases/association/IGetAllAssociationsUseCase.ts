import { IAssociationDTO } from "../../DTOs/IAssociationDTO";
import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";

export interface IGetAllAssociationsUseCase {
    execute(associationRepository: IAssociationRepository): Promise<IAssociationDTO[]>
}