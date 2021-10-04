import { IActionProjecAssociation } from "./IActionProjetAssociation";

export interface IProjectAssociation {
    name: string
    description: string
    actions: IActionProjecAssociation[]
    verified: boolean
}