var mongoose = require('mongoose'),
	User = require('../Models/user-registration.server.model.js');

//CREATE a User
exports.create = function(req, res){
	//Instantiate a User
	var user = new User(req.body);

	//save the user
	user.save(function(err){
		if(err){
			console.log(err);
			res.status(400).send(err);
		}
		else{
			res.json(user);
		}
	});
};

//READ a user
exports.read = function(req, res){
	//send back the user as json from the request
	res.json(req.user);
};

//UPDATE a user
exports.update = function(req, res){
	var user = req.user;

	//replace the article's properties with the new properties found in req.body
	user.email = req.body.email; 
	user.affiliation = req.body.affiliation; 
	user.teamName = req.body.teamName; 

	//save the article
	user.save(function(err){
		if(err){
			console.log(err);
			res.status(400).send(err);
		}
		else{
			res.json(user);
		}
	});
};

//DELETE a user
exports.delete = function(req, res){
	var user = req.user; 

	//remove the article
	user.remove(function(err){
		if(err){
			res.status(400).send(err);
		}
		else{
			res.end();
		}
	});
};

//Retrieve all users, sorted alphabetically by email
exports.list = function(req, res){
	User.find().sort('email').exec(function(err, users){
		if(err){
			res.status(400).send(err);
		}
		else{
			res.json(users);
		}
	});
};

//Find a user by its ID and pass it to the next request handler
exports.userById = function(req, res, next, id){
	User.findById(id).exec(function(err, user){
		if(err){
			res.status(400).send(err);
		}
		else{
			req.user = user;
			next();
		}
	});
};