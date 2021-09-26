import { Guard } from "../../commons/Guard";
import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";
import { IVerifyAssociationProjectUseCase } from "./IVerifyAssociationProjectUseCase";
import { NotFoundError } from "../../errors/NotFoundError";
import { NotVerifiedError } from "../../errors/NotVerifiedError";

export class VerifyAssociationProjectUseCase implements IVerifyAssociationProjectUseCase {
    async execute(associationName: string, projectName: string, associationRepository: IAssociationRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(associationName, "The association's name is required")
            Guard.AgainstNullOrUndefined(projectName, "The project's name is required")

            let association = await associationRepository.getAssociationByName(associationName)
            if (association == undefined) throw new NotFoundError("The association was not found")

            if (!association.isVerified()) throw new NotVerifiedError("The association is not verified")

            let project = await associationRepository.getProjectByName(associationName, projectName)
            if (project == undefined) throw new NotFoundError("The project was not found")
            
            project.verified = true
            await associationRepository.updateProject(associationName, project)
        } catch (error) {
            throw error
        }
    }
}