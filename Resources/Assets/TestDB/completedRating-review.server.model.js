/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
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
  projectGoals: {
    type: Number, 
    required: true 
  },
  design: {
    type: Number, 
    required: true 
  },
  prototype: {
    type: Number, 
    required: true 
  },
  projectPlan: {
    type: Number, 
    required: true 
  },
  projectRisks: {
    type: Number, 
    required: true 
  },
  teamMemberAssignments: {
    type: Number, 
    required: true 
  },
  liaisonCommunication: {
    type: Number, 
    required: true 
  },
  overallAssessment: {
    type: Number, 
    required: true 
  },
  issuesIdentified: {
    type: String
  }, 
  //not sure if this below, for recommended actions will work... Try and see see
  recommendedActions: {
    recommendation: {
      type: String
    }, 
    urgency: {
      type: Boolean
    }
  },
  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
completedRatingSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var CompletedRating = mongoose.model('CompletedRating', completedRatingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = CompletedRating;

