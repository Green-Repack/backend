import { Association } from "../../../domain/entity/Association";
import { IAssociationRepository } from "../../../application/interfaces/repository/IAssociationRepository";
import { IActionProjecAssociation } from "../../../domain/entityProperties/IActionProjetAssociation";
import { IProjectAssociation } from "../../../domain/entityProperties/IProjectAssociation";
import { injectable } from "inversify";
import { AssociationModel } from "../schemas/Association";
import { AssociationMap } from "../../../application/mappers/AssociationMap";

@injectable()
export class AssociationRepository implements IAssociationRepository {
    async updateAction(associationName: string, projectName: string, action: IActionProjecAssociation): Promise<void> {
        await AssociationModel.updateOne({name: associationName, "projects.name": projectName},
            {$set: {"projects.$.actions.name": action.name, 
                    "projects.$.actions.greenCoins": action.greenCoins,
                    "projects.$.actions.dateLimite": action.dateLimite}})
    }

    async updateProject(associationName: string, projectInfo: IProjectAssociation): Promise<void> {
        await AssociationModel.updateOne({name: associationName, "projects.name": projectInfo.name},
            {$set: {"projects.$.verified": projectInfo.verified}})
    }

    async addActionToProject(associationName: string, projectName: string, action: IActionProjecAssociation): Promise<void> {
        await AssociationModel.updateOne({name: associationName, "projects.name" : projectName},
        {$push: {"projects.$.actions": action}})
    }

    async getAssociationByEmail(email: string): Promise<Association | undefined> {
        let association = await AssociationModel.findOne({email: email.toLowerCase()})
        if (association) return AssociationMap.toDomain(association)
        else return undefined
    }

    async getAssociationById(associationId: string): Promise<Association | undefined> {
        let association = await AssociationModel.findById(associationId)
        if (association) return AssociationMap.toDomain(association)
        else return undefined
    }
    
    async getAssociationByName(name: string): Promise<Association | undefined> {
        let association = await AssociationModel.findOne({name: name.toLowerCase()})
        if (association) return AssociationMap.toDomain(association)
        else return undefined
    }

    async getAllAssociation(): Promise<Association[]> {
        let result: Association[] = new Array<Association>()
        let associations = await AssociationModel.find({})
        for(var association of associations) {
            result.push(AssociationMap.toDomain(association))
        }
        return result
    }

    async getProjectByName(associationName: string, projectName: string): Promise<IProjectAssociation | undefined> {
        let association = await AssociationModel.findOne({name: associationName, "projects.name": projectName})
        if (association != null) {
            for (var project of association.projects) {
                if (project.name == projectName) {
                    return {
                        name: project.name,
                        description: project.description,
                        actions: project.actions,
                        verified: project.verified
                    }
                }
            }
        } else {
            return undefined
        }
    }

    async getProjects(associationName: string): Promise<IProjectAssociation[]> {
        throw new Error("Method not implemented.");
    }

    async getProjectActionByName(associationName: string, projectName: string, actionName: string): Promise<IActionProjecAssociation | undefined> {
        throw new Error("Method not implemented.");
    }

    async getProjectActions(associationName: string, projectName: string): Promise<IActionProjecAssociation[]> {
        throw new Error("Method not implemented.");
    }

    async exists(idOrName: string): Promise<boolean> {
        let nameResult = await AssociationModel.findOne({name: idOrName.toLowerCase()})
        if (nameResult == null) {
            try {
                let idResult = await AssociationModel.findById(idOrName)
                if (idResult == null)  return false
                else return true
            } catch(error) {
                return false
            }
        } else {
            return true
        }
    }

    async delete(association: Association): Promise<void> {
        await AssociationModel.deleteOne({name: association.name.toLowerCase()})
    }

    async save(association: Association): Promise<void> {
        let exists = await this.exists(association.name)
        const rawAssociationData = AssociationMap.toPersistence(association)

        if (exists) {
            const mongooseUser = await AssociationModel.findOne({name: association.name.toLowerCase()})
            if (mongooseUser) await mongooseUser.updateOne(rawAssociationData)
        } else {
            await AssociationModel.create(rawAssociationData)
        }
    }
}