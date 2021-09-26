import { Guard } from "../../commons/Guard";
import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";
import { IAssociationHandler } from "../../interfaces/services/IAssociationHandler";
import { AssociationMap } from "../../mappers/AssociationMap";
import { IVerifyAssociationUseCase } from "./IVerifyAssociationUseCase";
import { NotFoundError } from "../../errors/NotFoundError";

export class VerifyAssociationUseCase implements IVerifyAssociationUseCase {
    async execute(associationName: string, associationRepository: IAssociationRepository, associationHandler: IAssociationHandler): Promise<void> {
        Guard.AgainstNullOrUndefined(associationName, "The association's name is required")
 
        let association = await associationRepository.getAssociationByName(associationName)
        if (association == undefined) throw new NotFoundError("The association was not found")

        let existsByName = await associationHandler.verifyByName(associationName)
        let existsBySiret = await associationHandler.verifyBySiret(association.siret)
        let existsByNumRNA = await associationHandler.verifyByRNA(association.numRNA)

        if (existsByName || existsBySiret || existsByNumRNA) {
            let associationDTO  = AssociationMap.toDTO(association)
            associationDTO.verified = true
            
            await associationRepository.save(AssociationMap.toDomain(associationDTO))
        }
    }
}