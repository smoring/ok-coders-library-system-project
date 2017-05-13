var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReturnDate = new Date () + 30

var schema = new Schema({
	isbn: String,
	check_out_date: new Date(),
	return_date: ReturnDate,
	check_out_by: String
})

module.exports = mongoose.model('history', schema);