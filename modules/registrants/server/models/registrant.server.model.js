'use strict';

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
  Schema = mongoose.Schema;

/* Create your schema */
var registrantSchema = new Schema({
  email: {
    type: String, 
    required: true,
    unique: false
  }, 
  affiliation: {
    type: String, 
    required: true, 
  }, 
  teamName: {
    type: String 
  },
  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
registrantSchema.pre('save', function(next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

mongoose.model('Registrant', registrantSchema);