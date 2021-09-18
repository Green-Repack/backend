import { Schema, model } from "mongoose";
import { IAssociationProps } from "../../../domain/entityProperties/IAssociationProps"

export const associationSchema = new Schema<IAssociationProps>({
    name: {
        type: String,
        required: true,
        minlength: 2,
        lowercase: true,
        maxlength: 255,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
    },
    siret: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
    },
    numRNA: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
    },
    address: {
        _id:false,
        streetNumber: {
            type: Number,
            required: true,
        },
        streetName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255,
            trim: true,
        },
        zipCode:{
            type: String,
            required: true,
            minlength: 2,
            maxlength: 9,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255,
            trim: true,
        }
    },
    greenCoins: Number,
    verified: {
        type: Boolean,
        default: false,
    },
    loginId: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
    },
    token: String
    
});

export const AssociatonModel = model<IAssociationProps>("Association", associationSchema)