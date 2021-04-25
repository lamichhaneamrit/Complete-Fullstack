var mongoose = require('mongoose')

var catSchema = mongoose.Schema({
	title:{type:String,required:true},
	slug:{type:String},
	
})

 module.exports = mongoose.model('Cat',catSchema)