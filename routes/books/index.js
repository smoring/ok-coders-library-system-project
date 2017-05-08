var Books = require('../../models/books');

exports.create = function(req, res){
	var book = new Books();
	var isbn = req.body.isbn;
	var title = req.body.title;
	var author = req.body.author;
	var genre = req.body.genre;
	var status = req.body.status;

	if(!isbn || !title || !author || !genre || !status) {
		res.send(202, "Incomplete information provided.");
	}

	book.isbn = isbn;
	book.title = title;
	book.author = author;
	book.genre = genre;
	book.status = status;
	book.isActive = true;

	book.save(function(err, data) {
		if(err) {
			console.log("Error saving to db: " + err);
			res.send(500, "Error with database");
		} else {
			res.json(200, {status: "success"});
		}
	});		
}

exports.delete = function(req, res){
	var id = req.param.id;

	book.findById(id, function (err, book) {
		book.isActive = false;
		book.save(function(err, book) {
			if(err) {
				console.log("Error deleting book: " + err);
				res.send(500, "Error with database");
			} else {
					res.json(200, {status: "success"});	
			}
		});
	});
};

exports.search = function(req, res){
	var book = new Books();
	var searchType = req.param.searchType;
	var searchData = req.param.searchData;

	if(!searchType || !searchData) {
		res.send(404, "Search type and criteria required.");
	}

	switch(searchType) {
		case(isbn):
			book.find({isbn: isbn}).exec(function(err,data) {
				if(!data) { 
					res.json(400,{status:"failed", reason: "Book not found."});
				} else {
						if(isActive) {

						}
				}
			});

		case(title):
			book.find({title: title}).exec(function(err,data) {
				if(!data) { 
					res.json(400,{status:"failed", reason: "Book not found."});
				} else {
						if(isActive) {

						}
				}
			});

		case(author):
			book.find({author: author}).exec(function(err,data) {
				if(!data) { 
					res.json(400,{status:"failed", reason: "Book not found."});
				} else {
						if(isActive) {

						}
				}
			});

		case(genre):
			book.find({genre: genre}).exec(function(err,data) {
				if(!data) { 
					res.json(400,{status:"failed", reason: "Book not found."});
				} else {
						if(isActive) {

						}
				}
			});

		case(status):
			book.find({status: status}).exec(function(err,data) {
				if(!data) { 
					res.json(400,{status:"failed", reason: "Book not found."});
				} else {
						if(isActive) {

						}
				}
			});
	}
}