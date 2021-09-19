import { Guard } from "../../commons/Guard";
import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";
import { IAssociationHandler } from "../../interfaces/services/IAssociationHandler";
import { AssociationMap } from "../../mappers/AssociationMap";
import { IVerifyAssociationUseCase } from "./IVerifyAssociationUseCase";

export class VerifyAssociationUseCase implements IVerifyAssociationUseCase {
    async execute(associationName: string, associationRepository: IAssociationRepository, associationHandler: IAssociationHandler): Promise<void> {
        Guard.AgainstNullOrUndefined(associationName, "The association's name is required")

        let association = await associationRepository.getAssociationByName(associationName)
        if (association == undefined) throw new NotFoundError("The association was not found")

        let exist = await associationHandler.verify(associationName)
        if (exist) {
            let associationDTO  = AssociationMap.toDTO(association)
            associationDTO.verified = true
            
            await associationRepository.save(AssociationMap.toDomain(associationDTO))
        }
    }
}