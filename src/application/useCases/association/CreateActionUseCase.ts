import { IActionProjecAssociation } from "../../../domain/entityProperties/IActionProjetAssociation";
import { Guard } from "../../commons/Guard";
import { NotVerifiedError } from "../../errors/NotVerifiedError";
import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";
import { ICreateActionUseCase } from "./ICreateActionUseCase";
import { NotFoundError } from "../../errors/NotFoundError"

export class CreateActionUseCase implements ICreateActionUseCase{
    async execute(associationName: string, projectName: string, actionInfo: any, associationRepository: IAssociationRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(associationName, "The orginisation's name is required")
            Guard.AgainstNullOrUndefined(projectName, "The project name is required")
            Guard.AgainstNullOrUndefined(actionInfo.name, "The acton's name is required")
            Guard.AgainstNullOrUndefined(actionInfo.dateLimite, "The limit date is required")
            
            let association = await associationRepository.getAssociationByName(associationName)
            if (association == undefined) throw new NotFoundError("Association not found")
            if (!association.isVerified()) throw new NotVerifiedError("The association is not verified yet")
            
            let project = await associationRepository.getProjectByName(associationName, projectName)
            if (project == undefined) throw new NotFoundError("The project is not find")
            if (!project.verified) throw new NotVerifiedError("The project is not verified yet.")

            let action: IActionProjecAssociation = {
                name: actionInfo.name,
                greenCoins: 0,
                dateLimite: new Date(actionInfo.dateLimite)
            }
            
            await associationRepository.addActionToProject(associationName, projectName, action)
        } catch (error) {
            throw error
        }
    } 
}