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
        trim: true,
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
        expireDate: {
            type: Date,
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
        trim: true,
    },
    merchant: {
        type: Boolean,
        default: false,
    },
    orders: [{
        _id:false,
        id: {
            type: String
        },
        amount: {
            type: Number
        },
        paymentDate: {
            type: Date
        },
        productId: {
            type: String
        }
    }],
    productSold: [{
        _id:false,
        productId: {
            type: String,
        },
        priceReceived: Number,
        sellDate: Date,
        deliveryFeePaid: Boolean,
        sellStatus: {
            type: String
        },
        shippingLabel: {
            url: String,
            expirationDate: Date,
            expired: Boolean
        }
    }],
    stripeCustomerId: String,
    token: String,
    siret: String,
    siren: String,
    creationDate: {
        type: Date,
        default: new Date()
    }
});

export const UserModel = model<IUserProps>("User", userSchema)