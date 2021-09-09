import { Schema, model } from "mongoose";
import {IProductPriceProps} from "../../../domain/interface/product/productData/IProductPriceProps";

export const productPrice = new Schema<IProductPriceProps>({
    productCategory: {
        type: String,
        required: true,
        trim: true,
    },
    productState: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
});

export const ProductPriceModel = model<IProductPriceProps>("ProductPrice", productPrice);