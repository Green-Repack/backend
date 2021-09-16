import { Schema, model } from "mongoose";
import {IProductProps} from "../../../domain/interface/product/IProductProps";

export const productSchema = new Schema<IProductProps>({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
    },
    creatorId: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
    },
    specificities: {
        _id:false,
        brand: {
            type: String,
            required: true,
            trim: true,
        },
        description:{
            type: String,
            required: true,
            trim: true,
        },
        technicalSpec: [{
            type: String,
            required: true,
            trim: true,
        }],
        productionYear: {
            type: Number,
            required: true
        }
    },
    initialPrice: {
        type: Number,
        default: 0,
    },
    displayPrice: {
        type: Number,
        default: 0,
    },
    images: [{
        type: String,
        minlength: 2,
        maxlength: 255,
        trim: true,
    }],
    status: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        default: 0,
        required: true
    },
    state: {
        type: String,
        required: true,
    },
    accepted: {
        type: Boolean,
        required: true,
        default: false
    },
});


export const ProductModel = model<IProductProps>("Product", productSchema);
