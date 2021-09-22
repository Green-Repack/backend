import { PromoCoins } from "../../../domain/entity/PromoCoins";
import { IBaseRepository } from "./IBaseRepositoty";

export interface IPromoCoinsRepository extends IBaseRepository<PromoCoins> {
    getActivePromo(): Promise<PromoCoins | undefined>
    promoExists(promo: PromoCoins): Promise<boolean>
}