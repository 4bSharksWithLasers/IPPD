var mongoose = require('mongoose'),
	Team = require('../Models/team-registration.server.model.js');

//CREATE a Team
exports.create = function(req, res){
	//Instantiate a Team
	var team = new Team(req.body);

	//save the team
	team.save(function(err){
		if(err){
			console.log(err);
			res.status(400).send(err);
		}
		else{
			res.json(team);
		}
	});
};

//READ a team
exports.read = function(req, res){
	//send back the team as json from the request
	res.json(req.team);
};

//UPDATE a team
exports.update = function(req, res){
	var team = req.team;

	//replace the article's properties with the new properties found in req.body
	team.name = req.body.name; 
	team.code = req.body.code; 

	//save the article
	team.save(function(err){
		if(err){
			console.log(err);
			res.status(400).send(err);
		}
		else{
			res.json(team);
		}
	});
};

//DELETE a team
exports.delete = function(req, res){
	var team = req.team; 

	//remove the article
	team.remove(function(err){
		if(err){
			res.status(400).send(err);
		}
		else{
			res.end();
		}
	});
};

//Retrieve all teams, sorted alphabetically by team name
exports.list = function(req, res){
	Team.find().sort('name').exec(function(err, teams){
		if(err){
			res.status(400).send(err);
		}
		else{
			res.json(teams);
		}
	});
};

//Find a team by its ID and pass it to the next request handler
exports.teamById = function(req, res, next, id){
	Team.findById(id).exec(function(err, team){
		if(err){
			res.status(400).send(err);
		}
		else{
			req.team = team;
			next();
		}
	});
};