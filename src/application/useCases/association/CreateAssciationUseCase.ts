import { IProjectAssociation } from "../../../domain/entityProperties/IProjectAssociation";
import { Guard } from "../../commons/Guard";
import { AlreadyExistsError } from "../../errors/AlreadyExistsError";
import { IAssociationRepository } from "../../interfaces/repository/IAssociationRepository";
import { IPasswordHandler } from "../../interfaces/services/IPasswordHandler";
import { AssociationMap } from "../../mappers/AssociationMap";
import { ICreateAssociationUseCase } from "./ICreationAssocationUseCase";

export class CreateAssociatonUseCase implements ICreateAssociationUseCase {
    async execute(associationInfo: any, passwordHandler: IPasswordHandler, associationRepository: IAssociationRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(associationInfo.name, "The name is required")
            Guard.AgainstNullOrUndefined(associationInfo.email, "The email is required")
            Guard.AgainstInvalidEmail(associationInfo.email, "The email is not valid")
            Guard.AgainstNullOrUndefined(associationInfo.address, "The address is required.")
            Guard.AgainstNullOrUndefined(associationInfo.password, "The password is required.")

            let association = await associationRepository.getAssociationByName(String(associationInfo.name))
            if (association != undefined) throw new AlreadyExistsError("The association already exists!")
            
            associationInfo.projects = new Array<IProjectAssociation>()
            associationInfo.verified = false
            associationInfo.creationDate = new Date()

            associationInfo.password = await passwordHandler.generatePasswordHash(associationInfo.password)
            
            let newAssociaton = AssociationMap.toDomain(associationInfo)
            await associationRepository.save(newAssociaton)
        } catch(error) {
            throw error
        }
    }
}