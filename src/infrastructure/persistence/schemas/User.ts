import { Schema, model } from "mongoose";
import { IUserProps } from "../../../domain/entityProperties/IUserProps"

export const userSchema = new Schema<IUserProps>({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
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
    greenCoins: {
        _id:false,
        amount: {
            type: Number,
            required: true,
        },
        expirationDate: {
            type: Number,
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
    },
    marchand: {
        type: Boolean,
        default: false,
    },
    achats: {
        _id:false,
        amount: {
            type: Number
        },
        paymentDate: {
            type: Date
        },
        itemsId: {
            type: Array
        }
    },
    productSold: {
        _id:false,
        productId: {
            type: Number,
        },
        priceReceived: {
            type: Date
        },
        sellDate: {
            type: Date
        }
    },
    token: String,
    siret: String,
    siren: String,
    creationDate: {
        type: Date,
        default: new Date()
    }
});

export const UserModel = model<IUserProps>("User", userSchema)