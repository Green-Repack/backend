export interface IMerchantHandler {
    verifyMerchantBySiret(siret: string): Promise<boolean>
    verifyMerchantBySiren(siren: string): Promise<boolean>
}