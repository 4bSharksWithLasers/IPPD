/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */

//set require variables
var config = require("./Server/Config/config");
var user = require("./Server/Models/db");
var express = require("express");
var path = require("path");

// set other variables
var server = express();
var port = config.port;

// set routes to static assets (images and stylesheets)
server.use("/Client/Assets", express.static(__dirname + "/Client/Assets"));

// open port
server.listen(port);
console.log("Listening: Port", port);

// route variables
var index = "Client/Views/index.html";
var registration = "Client/Views/registration.html";
var review = "Client/Views/review.html";
var admin = "Client/Views/admin.html";
var fourohthree = "Client/Views/403.html";

// authenticate users to prevent direct access to pages
function isAuthenticated(req, res, next) {
	if(1===1)
		return next();
	else
		res.sendFile(__dirname + fourohthree);
};

//--	get routes																														--//

// index.html
server.get("/", function(req, res) {
  res.sendFile(__dirname + index);
	console.log("Routed to: ", index);
});

// registration.html
server.get("/registration", isAuthenticated, function(req, res) {
	res.sendFile(__dirname + registration);
	console.log("Routed to: ", registration);
});

// review.html
server.get("/review", isAuthenticated, function(req, res) {
	res.sendFile(__dirname + review);
	console.log("Routed to: ", review);
});

// admin.html
server.get("/admin", isAuthenticated, function(req, res) {
	res.sendFile(__dirname + admin);
	console.log("Routed to: ", admin);
});

//--	post routes																														--//

server.post("/authenticate", function(req, res) {

});

/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */
