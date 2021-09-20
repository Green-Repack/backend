import { Guard } from "../../commons/Guard";
import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";
import { IVerifyAssociationProjectUseCase } from "./IVerifyAssociationProjectUseCase";

export class VerifyAssociationProjectUseCase implements IVerifyAssociationProjectUseCase {
    async execute(associationName: string, projectName: string, associationRepository: IAssociationRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(associationName, "The association's name is required")
            Guard.AgainstNullOrUndefined(projectName, "The project's name is required")

            let association = await associationRepository.getAssociationByName(associationName)
            if (association == undefined) throw new NotFoundError("The association was not found")

            let project = await associationRepository.getProjectByName(associationName, projectName)
            if (project == undefined) throw new NotFoundError("The project was not found")
            
            project.verified = true
            await associationRepository.updateProjectInfo(associationName, project)
        } catch (error) {
            throw error
        }
    }
}