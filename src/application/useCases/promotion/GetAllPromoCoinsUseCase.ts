import { IPromoCoinsDTO } from "../../DTOs/IPromoCoinsDTO"
import { IPromoCoinsRepository } from "../../interfaces/repository/IPromoCoinsRepository"
import { PromoCoinsMap } from "../../mappers/PromoCoinsMap"
import { IGetAllPromoUseCase } from "./IGetAllPromoCoinsUseCase"

export class GetAllPromoUseCase implements IGetAllPromoUseCase {
    async execute(promoRepository: IPromoCoinsRepository): Promise<IPromoCoinsDTO[]> {
        try {
            let promos = await promoRepository.getAllPromo()
            let promosDTO: IPromoCoinsDTO[] = new Array<IPromoCoinsDTO>()
            for (var promo of promos) {
                promosDTO.push(PromoCoinsMap.toDTO(promo))
            }
            return promosDTO
        } catch(error) {
            throw error
        }
    }
}