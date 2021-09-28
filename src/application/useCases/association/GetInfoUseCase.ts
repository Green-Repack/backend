import { Guard } from "../../commons/Guard";
import { IAssociationDTO } from "../../DTOs/IAssociationDTO";
import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";
import { AssociationMap } from "../../mappers/AssociationMap";
import { IGetInfoUseCase } from "./IGetInfoUseCase";
import { NotFoundError } from "../../errors/NotFoundError"

export class GetInfoUseCase implements IGetInfoUseCase {
    async execute(associationId: string, associationRepository: IAssociationRepository): Promise<IAssociationDTO> {
        try {
            let association = await associationRepository.getAssociationById(associationId)
            if (association == undefined) throw new NotFoundError("Association not found")

            let associationDTO = AssociationMap.toDTO(association)
            return associationDTO
        } catch(error) {
            throw error
        }
    }
}