const mongoose = require('mongoose'); 

const Schema = mongoose.Schema

const requestSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
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
    address: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        required: false,
    },
    messages: {
        type: String,
        required: false,
    },
    status: {
        type: Number,
        default: 0, //0: pending, 1: completed, 2: received, 3: delivered 
    },
})

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;