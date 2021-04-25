const mongoose = require('mongoose');

//------------ User Schema ------------//
const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true

    },
    password: {
        type: String
    },
    password2: {
        type: String


    },
    phone: {
        type: Number,
        unique: true
    },
    file: {
        type: String,

    },
    company: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    resetLink: {
        type: String,
        default: ''
    },
    orders: [{
        title: { type: String, required: true },
        price: { type: Number },
    }],
    wishlist: [{
        title: { type: String, required: true },
        desc: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number },
        discount: { type: Number },
        image: { type: String },
        type: { type: String }
    }],
    admin: { type: Number },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true });







const User = mongoose.model('User', UserSchema);

module.exports = User;