import { injectable } from "inversify";
import { IAssociationHandler } from "../../application/interfaces/services/IAssociationHandler";
import axios, { AxiosResponse } from "axios"

@injectable()
export class AssociaionHandler implements IAssociationHandler {
    async verifyByName(name: string): Promise<boolean> {
        try {
            let response: AxiosResponse = await axios.get(`https://entreprise.data.gouv.fr/api/rna/v1/full_text/${name}`)
            if (response.status == 200) {
                let associations = response.data.association
                for(var association of associations) {
                    if (association.titre.toString().toLowerCase() == name.toLowerCase()) return true
                }
            }
            return false
        } catch (error) {
            console.log(error)
            return false 
        }
    }

    async verifyBySiret(siret: string): Promise<boolean> {
        try {
            let response: AxiosResponse = await axios.get("https://entreprise.data.gouv.fr/api/rna/v1/siret/" + siret)
            if (response.status == 200) {
                let associations = response.data.association
                for(var association of associations) {
                    if (association.siret != null && association.siret.toString().toLowerCase() == siret.toLowerCase()) return true
                }
            }
            return false
        } catch (error) {
            console.log(error)
            return false 
        }
    }

    async verifyByRNA(numRNA: string): Promise<boolean> {
        try {
            let response: AxiosResponse = await axios.get("https://entreprise.data.gouv.fr/api/rna/v1/id/" + numRNA)
            if (response.status == 200) {
                let associations = response.data.association
                for(var association of associations) {
                    if (association.numRNA != null && association.numRNA.toString().toLowerCase() == numRNA.toLowerCase()) return true
                }
            }
            return false
        } catch (error) {
            console.log(error)
            return false 
        }
    }
}