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
    description: String,
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
    verified: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
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
    projects: [{
        _id:false,
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255,
            trim: true,
        },
        actions: [{
            _id:false,
            name: {
                type: String,
                required: true,
            },
            greenCoins: {
                type: Number,
                required: true,
            },
            dateLimite: {
                type: Date,
                required: true,
            },
        }],
        verified: {
            type: Boolean,
            required: true,
        },
    }],
    token: String,
    creationDate : {
        type: Date,
        require: true
    }
});

export const AssociatonModel = model<IAssociationProps>("Association", associationSchema)