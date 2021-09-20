import { Association } from "../../../domain/entity/Association";
import { IAssociationRepository } from "../../../application/interfaces/repository/IAssociationRepository";
import { IActionProjecAssociation } from "../../../domain/entityProperties/IActionProjetAssociation";
import { IProjectAssociation } from "../../../domain/entityProperties/IProjectAssociation";

export class AssociationRepository implements IAssociationRepository {
    updateProjectInfo(associationName: string, projectInfo: IProjectAssociation): Promise<void> {
        throw new Error("Method not implemented.");
    }
    addActionToProject(associationName: string, projectName: string, action: IActionProjecAssociation): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getAssociationByEmail(email: string): Promise<Association | undefined> {
        throw new Error("Method not implemented.");
    }
    getAssociationById(associationId: string): Promise<Association | undefined> {
        throw new Error("Method not implemented.");
    }
    getAssociationByName(name: string): Promise<Association | undefined> {
        throw new Error("Method not implemented.");
    }
    getAllAssociation(): Promise<Association[]> {
        throw new Error("Method not implemented.");
    }
    getProjectByName(associationName: string, projectName: string): Promise<IProjectAssociation | undefined> {
        throw new Error("Method not implemented.");
    }
    getProjects(associationName: string): Promise<IProjectAssociation[]> {
        throw new Error("Method not implemented.");
    }
    getProjectActionByName(associationName: string, projectName: string, actionName: string): Promise<IActionProjecAssociation | undefined> {
        throw new Error("Method not implemented.");
    }
    getProjectActions(associationName: string, projectName: string): Promise<IActionProjecAssociation[]> {
        throw new Error("Method not implemented.");
    }
    exists(idOrEmailOrUsername: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(t: Association): Promise<void> {
        throw new Error("Method not implemented.");
    }
    save(t: Association): Promise<void> {
        throw new Error("Method not implemented.");
    }

}