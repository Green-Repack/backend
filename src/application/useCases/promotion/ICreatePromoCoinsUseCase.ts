import { IPromoCoinsRepository } from "../../interfaces/repository/IPromoCoinsRepository";

export interface ICreatePromoCoinsUseCase {
    execute(promoInfo: unknown, promoCoinsRepository: IPromoCoinsRepository): Promise<void>
}