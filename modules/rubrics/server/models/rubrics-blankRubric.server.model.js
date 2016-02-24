'use strict';

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
  Schema = mongoose.Schema;

/* Create your schema */
var blankRubricSchema = new Schema({
  presentationType: {
    type: String, 
    required: true
  }, 
  instructions: {
    type: String, 
    required: true 
  },
  //not sure if this below, for ratedItems will work... Try and see see
  ratedItems: [{
    itemCategory: {
      type: String,
      required: true
    }, 
    description1: {
      type: String,
      required: true
    }, 
    description2: {
      type: String,
      required: true
    }, 
    description3: {
      type: String, 
      required: true
    }
  }],
  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
blankRubricSchema.pre('save', function(next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

mongoose.model('BlankRubric', blankRubricSchema);
