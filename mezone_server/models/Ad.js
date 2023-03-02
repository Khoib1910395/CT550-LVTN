const mongoose = require('mongoose');
const types = mongoose.Types;
// const userSchema = require('./User');

const adSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        basePrice: {
            type: types.Decimal128,
            required: true,
        },
        currentPrice: {
            type: types.Decimal128,
            required: true,
        },
        duration: {
            type: Number,
            default: 300,
        },
        timer: {
            type: Number,
            default: 300,
        },
        soldAt: {
            type: Date,
        },
        image: {
            type: String,
        },
        catergory: {
            type: String,
        },
        auctionStarted: {
            type: Boolean,
            default: false,
        },
        auctionEnded: {
            type: Boolean,
            default: false,
        },
        sold: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: types.ObjectId,
            ref: 'User',
        },
        purchasedBy: {
            type: types.ObjectId,
            ref: 'User',
        },
        currentBidder: {
            type: types.ObjectId,
            ref: 'User',
        },
        bids: [
            {
                User: {
                    type: types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                amount: {
                    type: types.Decimal128,
                    required: true,
                },
                time: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        room: {
            type: types.ObjectId,
            ref: 'room',
        },
    },
    { timestamps: true }
);

const Ad = mongoose.model('ad', adSchema);

module.exports = Ad;