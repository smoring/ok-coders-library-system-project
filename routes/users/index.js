var Users = require('../../models/users');

exports.create = function(req, res){
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var phone = req.body.phone;

	if(!firstName || !lastName || !phone) {
		res.send(400, "Insufficient information provided");
	}

	var user = new Users({
		firstName: firstName, 
		lastName: lastName, 
		phone: phone, 
		isActive: true});

	user.save(function(err){
		if(err){
			res.send(500, "Couldn't create user at this time")
		}
		res.send(200, "Successfully created user");
	})
}

exports.byLastName = function(req, res){
	var lastName = req.params.lastName
	Users.findOne({lastName:lastName}, function(err, doc){
		if(err){
			res.send(500, "User search unavailable")
		}
		if(!doc){
			res.send(404, "User not found")
		}
		res.json(doc)
	})
}

exports.all = function(req, res){
	Users.find({}, function(err, doc){
		if(err){
			res.send(500, "User search unavailable")
		}
		if(!doc){
			res.send(404, "User not found")
		}
		res.json(doc)
	})
}

exports.byId = function(req, res){
	var id = req.id
	Users.findById(id, function(err, doc){
		if(err){
			res.send(500, "User search unavailable")
		}
		if(!doc){
			res.send(404, "User not found")
		}
		res.json(doc)
	})
}

