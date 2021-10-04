import { Guard } from "../../commons/Guard"
import { IPromoCoinsDTO } from "../../DTOs/IPromoCoinsDTO"
import { IPromoCoinsRepository } from "../../interfaces/repository/IPromoCoinsRepository"
import { PromoCoinsMap } from "../../mappers/PromoCoinsMap"
import { IGetPromoUseCase } from "./IGetPromoUseCase"
import { NotFoundError } from "../../errors/NotFoundError"

export class GetPromoUseCase implements IGetPromoUseCase {
    async execute(name: string, promoRepository: IPromoCoinsRepository): Promise<IPromoCoinsDTO> {
        try {
            Guard.AgainstNullOrUndefined(name, "Promo's name is required")

            let promo = await promoRepository.getPromoByName(name.toLowerCase())
            if (promo == undefined) throw new NotFoundError("Promo not found")
        
            return PromoCoinsMap.toDTO(promo)
        } catch(error) {
            throw error
        }
    }
}
