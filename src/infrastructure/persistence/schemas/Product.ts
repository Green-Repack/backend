import { Schema, model } from "mongoose";
import { IProductProps } from "../../../domain/entityProperties/IProductProps";

<<<<<<<< HEAD:src/infrastructure/persistence/schemas/Product.ts
export const productSchema = new Schema<IProductProps>({
========
export const produitSchema = new Schema<IProductProps>({
>>>>>>>> origin/app_logic:src/infrastructure/persistence/schemas/Produit.ts
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
        minlength: 5,
        maxlength: 255,
    },
    brand: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 5,
        maxlength: 255,
    },
    model: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 5,
        maxlength: 255,
    },
    sellingStatus: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    specificities: [Schema.Types.Mixed],
    price: Number,
    priceSeller: Number,
    images: [{
        type: String,
        required: true
    }],
    merchantId: String,
    warehouseId: String,
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

<<<<<<<< HEAD:src/infrastructure/persistence/schemas/Product.ts
export const ProductModel = model<IProductProps>("Product", productSchema)
========
export const ProduitModel = model<IProductProps>("Produit", produitSchema)
>>>>>>>> origin/app_logic:src/infrastructure/persistence/schemas/Produit.ts
