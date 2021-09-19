import { Guard } from "../../commons/Guard";
import { IAssociationDTO } from "../../DTOs/IAssociationDTO";
import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";
import { AssociationMap } from "../../mappers/AssociationMap";
import { IGetInfoUseCase } from "./IGetInfoUseCase";

export class GetInfoUseCase implements IGetInfoUseCase {
    async execute(name: string, associationRepository: IAssociationRepository): Promise<IAssociationDTO> {
        Guard.AgainstNullOrUndefined(name, "The organisation's name is required")

        let association = await associationRepository.getAssociationByName(name)
        if (association == undefined) throw new NotFoundError("Association not found")

        let associationDTO = AssociationMap.toDTO(association)
        return associationDTO
    }
}