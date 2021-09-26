import { Schema, model } from "mongoose";
import { IProductProps } from "../../../domain/entityProperties/IProductProps";

export const productSchema = new Schema<IProductProps>({
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
    merchantId: String,
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

export const ProduitModel = model<IProductProps>("Produit", productSchema)