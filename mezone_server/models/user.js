const mongoose = require('mongoose');
const { productSchema } = require("./product");

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        required: true,
        type: String,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            messages: 'Please enter a valid email address'
        },
    },
    password: {
        required: true,
        type: String,
        validate: {
            validator: (value) => {
                return value.length >= 6;
            },
            messages: 'Please enter a long password (longer than 6)'
        },
    },
    address: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        default: 'user',
    },
    //cart
    cart: [
        {
            product: productSchema,
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    purchasedProducts: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'ad',
        },
    ],
    postedAds: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'ad',
        },
    ],
    bids: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'ad',
        },
    ],
});

const User = mongoose.model('User', userSchema);
module.exports = User;