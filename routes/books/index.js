var Books = require('../../models/books');

exports.create = function(req, res, next){
	var book = new Books();
	var isbn = req.body.isbn;
	var title = req.body.title;
	var author = req.body.author;
	var genre = req.body.genre;
	var status = req.body.status;

	if(!isbn || !title || !author || !genre || !status) {
		res.send(404, "Incomplete information provided.");
		return next();
	}

	book.isbn = isbn;
	book.title = title;
	book.author = author;
	book.genre = genre;
	book.status = status;

	book.save(function(err, data) {
		if(err){
			console.log("Error saving to db: " + err);
			res.send(404, "Error with database");
		} else {
			res.json(200, {status: "success"});
		}
	});	return next();		
}

exports.read = function(req, res, next){
	var book = new Books();
	var isbn = req.body.isbn;
	var title = req.body.title;
	var author = req.body.author;
	var genre = req.body.genre;
	var status = req.body.status;

	if(!isbn || !title || !author || !genre || !status) {
		res.send(404, "Incomplete information provided.");
		return next();
	}

	Book.findOne({isbn: isbn}).exec(function(err,data) {
		if(!data) { 
			res.json(400,{status:"failed", reason: "Book not found."});
			return next();
		}
	});
}