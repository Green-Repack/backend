import { PromoCoins } from "../../../domain/entity/PromoCoins";
import { IBaseRepository } from "./IBaseRepositoty";

export interface IPromoCoinsRepository extends IBaseRepository<PromoCoins> {
    getActivePromo(currentDate: Date): Promise<PromoCoins | undefined>
    getPromoById(id: string): Promise<PromoCoins | undefined>
    getPromoByName(name: string): Promise<PromoCoins | undefined>
    getAllPromo(): Promise<PromoCoins[]>
}