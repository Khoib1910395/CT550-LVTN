const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Order',
        },
        information: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
