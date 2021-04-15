var mongoose = require('mongoose')

var brandSchema = mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true }

})

module.exports = mongoose.model('Brand', brandSchema)