import { Schema, model } from "mongoose";
import { IGreenRepackProps } from "../../../domain/entityProperties/IGreenRepackProps"

export const greenRepackSchema = new Schema<IGreenRepackProps>({
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
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
    },
    token: String,
    admin: {
        type: Boolean,
        default: false,
    },
    creationDate: {
        type: Date,
        default: new Date()
    }
});

export const GreenRepackModel = model<IGreenRepackProps>("GreenRepack", greenRepackSchema)