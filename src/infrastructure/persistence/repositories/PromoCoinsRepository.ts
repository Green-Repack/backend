import { injectable } from "inversify";
import { IPromoCoinsRepository } from "../../../application/interfaces/repository/IPromoCoinsRepository";
import { PromoCoinsMap } from "../../../application/mappers/PromoCoinsMap";
import { PromoCoins } from "../../../domain/entity/PromoCoins";
import { PromoCoinsModel } from "../schemas/PromoCoins";

@injectable()
export class PromoCoinsRepository implements IPromoCoinsRepository {
    async getActivePromo(currentDate: Date): Promise<PromoCoins | undefined> {
        let promo = await PromoCoinsModel.findOne({
            dateDebut: {$lte: currentDate},
            dateFin: {$gte: currentDate}
        })
        if (promo != null) return PromoCoinsMap.toDomain(promo)
        else return undefined
    }

    async exists(name: string): Promise<boolean> {
        let promo = await PromoCoinsModel.findOne({name: name})
        if (promo != null) return true
        else return false
    }

    async delete(promo: PromoCoins): Promise<void> {
        await PromoCoinsModel.deleteOne({name: promo.name})
    }

    async save(promo: PromoCoins): Promise<void> {
        let exists = await this.exists(promo.name)
        const rawPromoData = PromoCoinsMap.toPersistence(promo)

        if (exists) {
            const mongooseUser = await PromoCoinsModel.findOne({name: promo.name})
            if (mongooseUser) await mongooseUser.updateOne(rawPromoData)
        } else {
            await PromoCoinsModel.create(rawPromoData)
        }
    }
}