var Books = require('../../models/books');

exports.create = function(req, res, next){
	var book = new Books();
	var isbn = req.body.isbn;
	var title = req.body.title;
	var author = req.body.author;
	var genre = req.body.genre;
	var status = req.body.status;

	if(!isbn || !title || !author || !genre || !status) {
		res.send(202, "Incomplete information provided.");
		return next();
	}

	book.isbn = isbn;
	book.title = title;
	book.author = author;
	book.genre = genre;
	book.status = status;
	book.isActive = true;

	book.save(function(err, data) {
		if(err){
			console.log("Error saving to db: " + err);
			res.send(500, "Error with database");
		} else {
			res.json(200, {status: "success"});
		}
	});	return next();		
}

exports.delete = function(req, res) {
	var id = req.params.id;
	var query = {"_id": id};
	
	Books.findByIdAndRemove(query, function(err, book) {
		if(err) {
			console.log("Error deleting book: " + err);
			res.send(404, "Error with database");
		} else {
				res.json(200, {status: "success"});	
		}
	});
};

exports.update = function(req, res) {
	var id = req.params.id;

	
	Books.findById(id, function(err, book) {
		if(err) {
			console.log("Error updating book: " + err);
			res.send(404, "Error with database");
		} else {
				isbn = req.body.isbn;
				title = req.body.title;
				author = req.body.author;
				genre = req.body.genre;
				status = req.body.status;
				isActive = req.body.isActive;

				book.save(function(err, updatedBook) {
					res.send(updatedBook);
				});	
		}
	});
};

exports.search = function(req, res) {
	var searchType = req.params.searchType;
	var searchData = req.params.searchData;

	console.log("called")

	if(!searchType || !searchData) {
		res.send(404, "Search type and criteria required.");
	}

	console.log("about to start search")

	if (searchType == "isbn") {
		console.log("starting search")
		console.log()
		Books.findOne({isbn: searchData}, function(err,data) {
			console.log("error", err)
			console.log(data)
			if(!data) { 
				res.json(404,{status:"failed", reason: "Book not found."});
			} else {
					res.json(200,data)
				}
			});
	}

	// switch(searchType) {

	// 	case("title"):
	// 		Books.find({title: title}).exec(function(err,data) {
	// 			if(!data) { 
	// 				res.json(404,{status:"failed", reason: "Book not found."});
	// 			} else {
	// 					if(isActive) {

	// 					}
	// 			}
	// 		});

	// 	case("author"):
	// 		Books.find({author: author}).exec(function(err,data) {
	// 			if(!data) { 
	// 				res.json(404,{status:"failed", reason: "Book not found."});
	// 			} else {
	// 					if(isActive) {

	// 					}
	// 			}
	// 		});

	// 	case("genre"):
	// 		Books.find({genre: genre}).exec(function(err,data) {
	// 			if(!data) { 
	// 				res.json(404,{status:"failed", reason: "Book not found."});
	// 			} else {
	// 					if(isActive) {

	// 					}
	// 			}
	// 		});

	// 	case("status"):
	// 		Books.find({status: status}).exec(function(err,data) {
	// 			if(!data) { 
	// 				res.json(404,{status:"failed", reason: "Book not found."});
	// 			} else {
	// 					if(isActive) {

	// 					}
	// 			}
	// 		});
	// }
}

exports.read = function(err, res) {
	var book = new Books();

	Books.find(function(err, data) {
		if(!data) {
			console.log("No books found: " + err);
			res.send(404, "No books found.");
		} else {
				res.send(data);
		}
	});
}