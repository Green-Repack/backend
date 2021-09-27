import { Schema, model } from "mongoose";
import { IWarehouseProps } from "../../../domain/entityProperties/IWarehouseProps"

export const warehouseSchema = new Schema<IWarehouseProps>({
    location: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 5,
        maxlength: 255,
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
    },
    stock: [{
        _id:false,
        category: {
            type: String,
            required: true,
            minlength: 2,
            lowercase: true,
            maxlength: 255,
            trim: true,
        },
        brand: {
            type: String,
            required: true,
            lowercase: true,
            minlength: 2,
            maxlength: 255,
            trim: true,
        },
        model:{
            type: String,
            required: true,
            lowercase: true,
            minlength: 2,
            maxlength: 255,
            trim: true,
        },
        year: {
            type: Number,
            required: true
        },
        quantityAvailable: {
            type: Number,
            required: true
        },
    }]
});

export const WarehouseModel = model<IWarehouseProps>("Warehouse", warehouseSchema)