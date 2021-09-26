export interface IAssociationHandler {
    verifyByName(name: string): Promise<boolean>
    verifyBySiret(siret: string): Promise<boolean>
    verifyByRNA(numRNA: string): Promise<boolean>
}