import { IBaseRepository } from "./IBaseRepositoty";
import { Association } from "../../../domain/entity/Association";
import { IProjectAssociation } from "../../../domain/entityProperties/IProjectAssociation";
import { IActionProjecAssociation } from "../../../domain/entityProperties/IActionProjetAssociation";

export interface IAssociationRepository extends IBaseRepository<Association> {
    getAssociationByEmail(email: string): Promise<Association | undefined>
    getAssociationById(associationId: string): Promise<Association | undefined>
    getAssociationByName(name: string): Promise<Association | undefined>
    getAllAssociation(): Promise<Association[]>
    getProjectByName(associationName: string, projectName: string): Promise<IProjectAssociation | undefined>
    getProjects(associationName: string): Promise<IProjectAssociation[]>
    getProjectActionByName(associationName: string, projectName: string, actionName: string): Promise<IActionProjecAssociation | undefined>
    getProjectActions(associationName: string, projectName: string): Promise<IActionProjecAssociation[]>
    addActionToProject(associationName: string, projectName: string, action: IActionProjecAssociation): Promise<void>
}