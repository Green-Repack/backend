import { Schema, model } from "mongoose";
import { IProductProps } from "../../../domain/entityProperties/IProductProps";

export const productSchema = new Schema<IProductProps>({
    productId: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: 255,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        maxlength: 255,
    },
    brand: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: 255,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: 255,
        trim: true,
    },
    sellingStatus: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    specificities: [{
        type: String
    }],
    price: Number,
    priceSeller: Number,
    images: [{
        type: String,
        required: true
    }],
    merchantId: String,
    warehouseId: String,
    stripeProductId: String,
    sold: {
        type: Boolean,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    weight : Number,
    year: {
        type: Number,
        required: true
    }
});

export const ProductModel = model<IProductProps>("Product", productSchema)
