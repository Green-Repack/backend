export interface IAssociationHandler {
    verify(name?: string, siret?: string, numRNA?: string): boolean
}