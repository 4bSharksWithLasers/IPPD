'use strict';

var mongoose = require('mongoose'),
	CompletedRating = require('../models/rubrics-completedRating.server.model.js');

//CREATE a completedRating
exports.create = function(req, res){
	//Instantiate a completedRating
	var completedRating = new CompletedRating(req.body);

	//save the completedRating
	completedRating.save(function(err){
		if(err){
			console.log(err);
			res.status(400).send(err);
		}
		else{
			res.json(completedRating);
		}
	});
};

//READ a completedRating
exports.read = function(req, res){
	//send back the completedRating as json from the request
	res.json(req.completedRating);
};

//UPDATE a completedRating
exports.update = function(req, res){
	var completedRating = req.completedRating;

	//replace the article's properties with the new properties found in req.body
	completedRating.team = req.body.team; 
	completedRating.presentationType = req.body.presentationType;
	completedRating.email = req.body.email; 
	//not sure if the below lines will work, due to the nested nature of the schema. figure this out later?
	completedRating.ratedItems = req.body.ratedItems; 
	completedRating.issuesIdentified = req.body.issuesIdentified;
	completedRating.recommendedActions = req.body.recommendedActions;

	//save the article
	completedRating.save(function(err){
		if(err){
			console.log(err);
			res.status(400).send(err);
		}
		else{
			res.json(completedRating);
		}
	});
};

//DELETE a completedRating
exports.delete = function(req, res){
	var completedRating = req.completedRating; 

	//remove the article
	completedRating.remove(function(err){
		if(err){
			res.status(400).send(err);
		}
		else{
			res.end();
		}
	});
};

//Retrieve all completedRatings, sorted alphabetically by team name
exports.list = function(req, res){
	CompletedRating.find().sort('team').exec(function(err, completedRatings){
		if(err){
			res.status(400).send(err);
		}
		else{
			res.json(completedRatings);
		}
	});
};

//Find a completedRating by its ID and pass it to the next request handler
exports.completedRatingById = function(req, res, next, id){
	CompletedRating.findById(id).exec(function(err, completedRating){
		if(err){
			res.status(400).send(err);
		}
		else{
			req.completedRating = completedRating;
			next();
		}
	});
};
