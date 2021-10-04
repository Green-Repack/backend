import axios, { AxiosResponse } from "axios";
import { injectable } from "inversify";
import { IMerchantHandler } from "../../application/interfaces/services/IMerchandHandler";

@injectable()
export class MerchantHandler implements IMerchantHandler {
    async verifyMerchantBySiret(siret: string): Promise<boolean> {
        try {
            let response: AxiosResponse = await axios.get("https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/"+siret)
            return response.status == 200;
        } catch(error) {
            return false
        }
    }
    async verifyMerchantBySiren(siret: string): Promise<boolean> {
        try {
            let response: AxiosResponse = await axios.get("https://entreprise.data.gouv.fr/api/sirene/v1/siren/"+siret)
                return response.status == 200;
        } catch(error) {
            return false
        }
    }
}