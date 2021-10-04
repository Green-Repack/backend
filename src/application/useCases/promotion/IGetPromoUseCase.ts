import { IPromoCoinsDTO } from "../../DTOs/IPromoCoinsDTO";
import { IPromoCoinsRepository } from "../../interfaces/repository/IPromoCoinsRepository";

export interface IGetPromoUseCase {
    execute(name: string, promoRepository: IPromoCoinsRepository): Promise<IPromoCoinsDTO>
}