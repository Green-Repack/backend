import { IPromoCoinsRepository } from "../../interfaces/repository/IPromoCoinsRepository";

export interface IDeletePromoUseCase {
    execute(promoName: string, promoRepository: IPromoCoinsRepository): Promise<void>
}