/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */

var config = require("./Assets/Config/config");
var express = require("express");
var path = require("path");

var server = express();
var port = config.port;

// set routes to static assets (images and stylesheets)
server.use('/Styles', express.static(__dirname + '/Styles'));
server.use('/Assets', express.static(__dirname + '/Assets'));

// open port
server.listen(port);
console.log("Listening: Port", port);

// set routes
var index = '/Views/index.html';
var registration = '/Views/registration.html';
var review = '/Views/review.html';
var admin = '/Views/admin.html';

// index.html
server.get('/', function(req, res) {
  res.sendFile(__dirname + index);
	console.log("Routed to: ", index);
});

// registration.html
server.get('/registration', function(req, res) {
	res.sendFile(__dirname + registration);
	console.log("Routed to: ", registration);
});

// review.html
server.get('/review', function(req, res) {
	res.sendFile(__dirname + review);
	console.log("Routed to: ", review);
});

// admin.html
server.get('/admin', function(req, res) {
	res.sendFile(__dirname + admin);
	console.log("Routed to: ", admin);
});

/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */
