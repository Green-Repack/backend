import { Schema, model } from "mongoose";
import { IPromoCoins } from "../../../domain/entityProperties/IPromoCoins";

export const promoCoinsSchema = new Schema<IPromoCoins>({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: 5,
        maxlength: 255,
        trim: true,
    },
    dateDebut: {
        type: Date,
        required: true,
    },
    dateFin: {
        type: Date,
        required: true,
    },
    multiplicateur: {
        type: Number,
        required: true,
    },
    dateCreation: {
        type: Date,
        required: true,
    },
});

export const PromoCoinsModel = model<IPromoCoins>("PromoCoins", promoCoinsSchema)