var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({	
// User collection schema
	objectID: Schema.Types.ObjectId,
	firstName: String,
	lastName: String,
	phone: String
});

module.exports = mongoose.model('users', schema);