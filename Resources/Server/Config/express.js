var path = require('path'), 
	express = require('express'), 
	mongoose = require('mongoose'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	config = require('../../../config/env/development.js'),
	reviewRouter = require('../Routes/review.server.routes.js'); 

module.exports.init = function(){
	//connect to database
	mongoose.connect(config.db.uri);

	//initialize app
	var app = express(); 

	//enable request logging for development debugging
	app.user(morgan('dev'));

	//body parsing middleware
	app.use(bodyParser.json());

	//serve static files
	app.use('/', express.static(_dirname + '/../../client'));

	//user the review router for request to the api
	//NOT SURE ABOUT THE BELOW LINE. not sure about the routing, where things should go
	app.use('/api/review', reviewRouter);

	//go to homepage for all routes not specified
	app.all('/*', function(req, res){
		res.sendFile(path.resolve('Client/index.html'));
	});

	return app; 
};