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
  ratedItems: {
    itemCategory: {
    	type: String,
    	required: true
    } 
    description1: String, 
    description2: String, 
    description3: String
  },
  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
blankRubricSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var BlankRubric = mongoose.model('BlankRubric', blankRubricSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = BlankRubric;


