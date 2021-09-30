import { Guard } from "../../commons/Guard";
import { IPromoCoinsDTO } from "../../DTOs/IPromoCoinsDTO";
import { AlreadyExistsError } from "../../errors/AlreadyExistsError";
import { IPromoCoinsRepository } from "../../interfaces/repository/IPromoCoinsRepository";
import { PromoCoinsMap } from "../../mappers/PromoCoinsMap";
import { ICreatePromoCoinsUseCase } from "./ICreatePromoCoinsUseCase";

export class CreatePromoCoinsUseCase implements ICreatePromoCoinsUseCase {
    async execute(promoInfo: any, promoCoinsRepository: IPromoCoinsRepository): Promise<void> {
        try {
            Guard.AgainstNullOrUndefined(promoInfo.name, "Name is required")
            Guard.AgainstNullOrUndefined(promoInfo.dateDebut, "dateDebut is required")
            Guard.AgainstNullOrUndefined(promoInfo.dateFin, "dateFin is required")
            Guard.AgainstNullOrUndefined(promoInfo.multiplicateur, "Multiplicateur is required")

            let promoCoinsDTO: IPromoCoinsDTO = {
                name: promoInfo.name,
                dateDebut: promoInfo.dateDebut,
                dateFin:  promoInfo.dateFin,
                multiplicateur: promoInfo.multiplicateur,
                dateCreation: new Date()
            }

            let promo = PromoCoinsMap.toDomain(promoCoinsDTO)

            let exists = await promoCoinsRepository.exists(promo.name)
            if (exists) throw new AlreadyExistsError("This promotion already exists")

            await promoCoinsRepository.save(promo)
        } catch(error) {
            throw error
        }
    }
    
}