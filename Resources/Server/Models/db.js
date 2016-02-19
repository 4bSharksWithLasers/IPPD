/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */

// set require variables
var mongoose = require("mongoose");

// set other variables
var Schema = mongoose.Schema;

// create schema
var IppdSchema = new Schema({

});

//export data
module.exports = mongoose.model("User", IppdSchema);
