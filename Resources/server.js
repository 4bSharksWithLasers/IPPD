/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */

var config = require("./Assets/Config/config");
var express = require("express");
var path = require("path");

var server = express();
var port = config.port;

// open port
server.listen(port);
console.log("Listening: Port", port);

// set routes to static assets (images and stylesheets)
server.use('/Styles', express.static(__dirname + '/Styles'));
server.use('/Assets', express.static(__dirname + '/Assets'));

// set routes

var index = '/Views/index.html';
var registration = ['/Views/registration.html'];
var admin = ['/Views/admin.html'];

// index.html
server.get('/', function(req, res) {
  res.sendFile(__dirname + index);
	console.log("Routed to: ", index);
});

// registration.html
server.get('/registration', function(req, res) {
	res.sendFile(__dirname + registration[0]);
	console.log("Routed to: ", registration[0]);
});

// admin.html
server.get('/admin', function(req, res) {
	res.sendFile(__dirname + admin[0]);
	console.log("Routed to: ", admin[0]);
});

/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */
