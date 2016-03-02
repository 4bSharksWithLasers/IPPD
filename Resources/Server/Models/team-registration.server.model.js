/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var teamSchema = new Schema({
  name: {
    type: String, 
    required: true,
    unique: true
  }, 
  code: {
    type: Number, 
    required: true
  }, 
  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
teamSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Team = mongoose.model('Team', teamSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Team;
