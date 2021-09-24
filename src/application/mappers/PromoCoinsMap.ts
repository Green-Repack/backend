import { PromoCoins } from "../../domain/entity/PromoCoins"
import { IPromoCoinsDTO } from "../DTOs/IPromoCoinsDTO"

export class PromoCoinsMap {
    public static toDTO(promo: PromoCoins): IPromoCoinsDTO {
        return {
            id: promo.id,
            name: promo.name,
            dateDebut: promo.dateDebut,
            dateFin: promo.dateFin,
            multiplicateur: promo.multiplicateur,
            dateCreation: promo.dateCreation
        }
    }

    public static toDomain(promo: any): PromoCoins {
        return PromoCoins.createPromoCoins({
            name: promo.name,
            dateDebut: promo.dateDebut,
            dateFin: promo.dateFin,
            multiplicateur: promo.multiplicateur,
            dateCreation: promo.dateCreation
        }, promo.id)
    }

    public static toPersistence(promo: PromoCoins): any {
        return {
            id: promo.id,
            name: promo.name,
            dateDebut: promo.dateDebut,
            dateFin: promo.dateFin,
            multiplicateur: promo.multiplicateur,
            dateCreation: promo.dateCreation
        }
    }
}