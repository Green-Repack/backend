import { Schema, model } from "mongoose";
import {IShippingLabelProps} from "../../../domain/entityProperties/IShippingLabelProps";

export const shippingLabelSchema = new Schema<IShippingLabelProps>({
   url: {
       type: String,
       required: true,
   },
    creationDate: {
       type: Date,
        required: true
    },
    productId: {
       type: String,
        required: true,
    },
    userId:{
        type: String,
        required: true,
    }
});

export const ShippingLabelModel = model<IShippingLabelProps>("ShippingLabel", shippingLabelSchema);
