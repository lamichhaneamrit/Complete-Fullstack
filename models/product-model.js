var mongoose = require('mongoose')

var ProductSchema = mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String },
    desc: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number },
    discount: { type: Number },
    coupon: { type: String },
    image: {
        type: 'String',
    },
    file: {
        type: 'String'
    },
    ProductRating: [{
        userId: { type: String },

        username: { type: String, default: ' ' },
        userRating: { type: Number, default: 0 },
        userReview: { type: String, default: '' },
        Title: { type: String, default: '' },
        userImage: { type: String },

        date: { type: Date, default: Date.now }

    }],
    avgrate: { type: Number, default: 0 },
    ratingNumber: [Number],
    ratingSum: { type: Number, default: 0 },
    quantity: { type: Number },
    color: { type: String },
    likes: { type: Number },
    size: { type: String },
    type: { type: String },
    type2: { type: String },
    brand: { type: String },
    overview: { type: String }

})

module.exports = mongoose.model('Product', ProductSchema)