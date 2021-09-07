const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
    },
    marchandId: {
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
        }]
    },
    initialPrice: {
        type: Number,
        default: 0,
    },
    displayPrice: {
        type: Number,
        default: 0,
    },
    photos: [{
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
    accepte: {
        type: Boolean,
        required: true,
        default: false
    },
});


module.exports = mongoose.model("Product", productSchema);