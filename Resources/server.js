var config = require("./config");
var express = require("express");
var path = require("path");

var server = express();
var port = config.port;

server.listen(port);
console.log("Listening: Port", port);

//server.set('/', path.join(__dirname, '/'));
server.use('/Styles', express.static(__dirname + '/Styles'));
server.use('/Assets', express.static(__dirname + '/Assets'));
// set routes
server.get('/', function(req, res) {
  	res.sendFile(__dirname + '/Views/index.html');
});
