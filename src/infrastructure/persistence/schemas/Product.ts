import { Schema, model } from "mongoose";
import { IProductProps } from "../../../domain/entityProperties/IProductProps";

export const productSchema = new Schema<IProductProps>({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    specificities: {
        _id:false,
        specList: [{
            name: {
                type: String
            }
        }]
    },
    status: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    priceSeller: {
        type: Number,
        default: 0,
    },
    images: [{
        type: String,
        minlength: 2,
        maxlength: 255,
        trim: true,
    }],
    merchantId: {
        type: String,
        required: true,
    },
    warehouseId: {
        type: String,
    },
    accepted: {
        type: Boolean,
        required: true,
        default: false
    },
    creationDate: {
        type: Date,
        required: true,
    },
    acceptationDate: {
        type: Date,
    },
    weight: {
        type: Number,
        default: 5,
        required: true
    },
});


export const ProductModel = model<IProductProps>("Product", productSchema);
