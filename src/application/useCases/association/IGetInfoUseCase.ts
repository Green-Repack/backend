import { IAssociationDTO } from "../../DTOs/IAssociationDTO";
import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";

export interface IGetInfoUseCase {
    execute(name: string, associationRepository: IAssociationRepository): Promise<IAssociationDTO >
}