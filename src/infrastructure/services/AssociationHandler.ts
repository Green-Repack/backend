import { injectable } from "inversify";
import { IAssociationHandler } from "../../application/interfaces/services/IAssociationHandler";
import axios, { AxiosResponse } from "axios"

@injectable()
export class AssociaionHandler implements IAssociationHandler {
    async verifyByName(name: string): Promise<boolean> {
        if(name){
            try {
                let response: AxiosResponse = await axios.get(`https://entreprise.data.gouv.fr/api/rna/v1/full_text/${name}`)
                if (response.status == 200) return true
                return false
            } catch (error) {
                console.log(error)
                return false 
            }
        }
        return false 
    }

    async verifyBySiret(siret: string): Promise<boolean> {
        if(siret){
            try {
                let response: AxiosResponse = await axios.get("https://entreprise.data.gouv.fr/api/rna/v1/siret/" + siret)
                if (response.status == 200) return true
                return false
            } catch (error) {
                console.log(error)
                return false 
            }
        }
        return false 
    }

    async verifyByRNA(numRNA: string): Promise<boolean> {
        if(numRNA){
            try {
                let response: AxiosResponse = await axios.get("https://entreprise.data.gouv.fr/api/rna/v1/id/" + numRNA)
                if (response.status == 200) return true
                return false
            } catch (error) {
                console.log(error)
                return false 
            }
        }
        return false 
    }
}