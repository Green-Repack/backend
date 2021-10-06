import { IActionProjecAssociation } from "../../../domain/entityProperties/IActionProjetAssociation";
import { IProjectAssociation } from "../../../domain/entityProperties/IProjectAssociation";
import { Guard } from "../../commons/Guard";
import { NotVerifiedError } from "../../errors/NotVerifiedError";
import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";
import { ICreateProjectUseCase } from "./ICreateProjectUseCase";
import { NotFoundError } from "../../errors/NotFoundError"
import { AssociationMap } from "../../mappers/AssociationMap";

export class CreateProjectUseCase implements ICreateProjectUseCase {
    async execute(associationId: string, projectInfo: any, associationRepository: IAssociationRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(projectInfo.name, "The project name is required")
            Guard.AgainstNullOrUndefined(projectInfo.description, "The project description is required")
            
            let association = await associationRepository.getAssociationById(associationId)
            if (association == undefined) throw new NotFoundError("Association not found")
            if (!association.isVerified()) throw new NotVerifiedError("The association is not verified yet")

            let associationDTO = AssociationMap.toDTO(association)
            
            let projectDTO: IProjectAssociation = {
                name: projectInfo.name,
                description: projectInfo.description,
                actions: new Array<IActionProjecAssociation>(),
                verified: false
            }

            associationDTO.projects.push(projectDTO)
            await associationRepository.save(AssociationMap.toDomain(associationDTO))
        } catch (error) {
            throw error
        }
    }
}