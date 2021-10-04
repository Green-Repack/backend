import { IPromoCoinsRepository } from "../../interfaces/repository/IPromoCoinsRepository"
import { IDeletePromoUseCase } from "./IDeletePromoCoinsUseCase"
import { NotFoundError } from "../../errors/NotFoundError"

export class DeletePromoUseCase implements IDeletePromoUseCase {
    async execute(promoName: string, promoRepository: IPromoCoinsRepository): Promise<void> {
        let promo = await promoRepository.getPromoByName(promoName)
        if(!promo) throw new NotFoundError("Promotion not found")
        await promoRepository.delete(promo)
    }
}