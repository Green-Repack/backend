import { Schema, model } from "mongoose";
import { IProduitProps } from "../../../domain/entityProperties/IProduitProps";

export const produitSchema = new Schema<IProduitProps>({
    name: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: 5,
        maxlength: 255,
    },
    brand: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: 5,
        maxlength: 255,
    },
    model: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: 5,
        maxlength: 255,
    },
    specificities: {
        _id:false,
        memoire: Number,
        ram: Date,
        color: Array,
        poids: Number
    },
    price: Number,
    priceSeller: Number,
    images: [{
        type: String,
        required: true
    }],
    marchandId: String,
    warehouseId: String,
    accepted: Boolean,
    sold: {
        type: Boolean,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    acceptationDate: Date
});

export const ProduitModel = model<IProduitProps>("Produit", produitSchema)