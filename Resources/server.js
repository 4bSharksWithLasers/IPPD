/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */

//set require variables
var config = require("./Assets/Config/config");
var user = require("./Assets/Models/db");
var express = require("express");
var path = require("path");

// set other variables
var server = express();
var port = config.port;

// set routes to static assets (images and stylesheets)
server.use("/Assets", express.static(__dirname + "/Assets"));

// open port
server.listen(port);
console.log("Listening: Port", port);

// route variables
var index = "/Views/index.html";
var registration = "/Views/registration.html";
var review = "/Views/review.html";
var admin = "/Views/admin.html";

//--	get routes																														--//

// index.html
server.get("/", function(req, res) {
  res.sendFile(__dirname + index);
	console.log("Routed to: ", index);
});

// registration.html
server.get("/registration", function(req, res) {
	res.sendFile(__dirname + registration);
	console.log("Routed to: ", registration);
});

// review.html
server.get("/review", function(req, res) {
	res.sendFile(__dirname + review);
	console.log("Routed to: ", review);
});

// admin.html
server.get("/admin", function(req, res) {
	res.sendFile(__dirname + admin);
	console.log("Routed to: ", admin);
});

//--	post routes																														--//

server.post("/authenticate", function(req, res) {

});

/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */
