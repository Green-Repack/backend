const mongoose = require('mongoose');

const priceData = new mongoose.Schema({
    productCategory: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true,
    },
    productState: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
});


module.exports = mongoose.model("PriceData", priceData);