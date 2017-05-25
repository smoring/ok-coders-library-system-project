var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	isbn: String,
	title: String,
	author: String,
	genre: String,
	status: String
	isActive: Schema.Types.Boolean
});

module.exports = mongoose.model('books', schema);