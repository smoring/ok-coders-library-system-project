var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({	
	objectID: Schema.Types.ObjectId,
	firstName: String,
	lastName: String,
	phone: String,
	isActive: Schema.Types.Boolean
});

module.exports = mongoose.model('users', schema);