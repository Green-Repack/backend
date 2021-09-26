import { IAssociationDTO } from "../../DTOs/IAssociationDTO";
import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";
import { AssociationMap } from "../../mappers/AssociationMap";
import { IGetAllAssociationsUseCase } from "./IGetAllAssociationsUseCase";

export class getAllAssociationUseCase implements IGetAllAssociationsUseCase {
    async execute(associationRepository: IAssociationRepository): Promise<IAssociationDTO[]> {
        let associations = await associationRepository.getAllAssociations()
        let associationsDTO: IAssociationDTO[] = new Array<IAssociationDTO>()
        for (var association of associations) {
            associationsDTO.push(AssociationMap.toDTO(association))
        }
        return associationsDTO
    }
}