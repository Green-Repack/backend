import { IPromoCoinsDTO } from "../../DTOs/IPromoCoinsDTO";
import { IPromoCoinsRepository } from "../../interfaces/repository/IPromoCoinsRepository";

export interface IGetAllPromoUseCase {
    execute(promoRepository: IPromoCoinsRepository): Promise<IPromoCoinsDTO[]>
}