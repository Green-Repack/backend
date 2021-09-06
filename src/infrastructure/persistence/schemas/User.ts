const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
        type: Number,
        required: true,
        default: 0,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
    },
    role: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        required: true,
    },
});

userSchema.methods.generateAuthToken = async function(expirationTime: number) {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY, {expiresIn: expirationTime })
    user.tokens = token
    await user.save()
    return token
}

module.exports = mongoose.model("User", userSchema);