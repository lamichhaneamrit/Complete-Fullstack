var mongoose = require('mongoose')

var TypeSchema = mongoose.Schema({
	title:{type:String,required:true}

	
})

 module.exports = mongoose.model('Type',TypeSchema)