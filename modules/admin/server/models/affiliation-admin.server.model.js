'use strict'; 

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
  Schema = mongoose.Schema;

/* Create your schema */
var affiliationSchema = new Schema({
  theAffiliation: {
    type: String, 
    required: true
  }, 
  codeAssociated:{
    type: Boolean
  },
  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
affiliationSchema.pre('save', function(next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

mongoose.model('Affiliation', affiliationSchema);