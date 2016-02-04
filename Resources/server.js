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

// index.html
server.get('/', function(req, res) {
  res.sendFile(__dirname + '/Views/index.html');
});

// registration.html
server.get('/registration', function(req, res) {
	res.sendFile(__dirname + '/Views/registration.html');
});

// admin.html
server.get('/admin', function(req, res) {
	res.sendFile(__dirname + '/Views/admin.html');
});

/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */
