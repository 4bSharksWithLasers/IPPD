'use strict';

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
  Schema = mongoose.Schema;

/* Create your schema */
//all the categories should be required ones. 
var completedRatingSchema = new Schema({
  team: {
    type: String, 
    required: true
  }, 
  presentationType: {
    type: String, 
    required: true
  }, 
  email: {
    type: String, 
    required: true 
  },
  ratedItems:[{
    rubricItem: {
      type: String,
    }, 
    rating: {
      type: Number
    }
  }],
  issuesIdentified: {
    type: String
  }, 
  recommendedActions: [{
    recommendation: {
      type: String
    }, 
    urgency: {
      type: Boolean
    }
  }],
  //not sure if this below, for recommended actions will work... Try and see see
  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
completedRatingSchema.pre('save', function(next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

mongoose.model('CompletedRating', completedRatingSchema);
