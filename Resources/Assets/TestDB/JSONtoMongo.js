'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    User = require('./user-registration.server.model.js'), 
    Team = require('./team-registration.server.model.js'),
    BlankRubric = require('./blankRubric-review.server.model.js'),
    CompletedRating = require('./completedRating-review.server.model.js'),
    config = require('./config');
    
/* Connect to your database. DONE*/
  mongoose.connect(config.db.uri);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("Connected!");

      /* 
        Instantiate a mongoose model for each user object in the JSON file, 
        and then save it to your Mongo database. DONE 
       */

    var usersToAdd = JSON.parse(fs.readFileSync('./users.json', 'utf8')).userEntries;
    var callback1 = function(err){
      if(err) throw err;
    }

    var teamsToAdd = JSON.parse(fs.readFileSync('./teams.json', 'utf8')).teamEntries;
    var callback2 = function(err){
      if(err) throw err;
    }

    var blankRubricToAdd = JSON.parse(fs.readFileSync('./blankRubric.json', 'utf8')).blankRubricEntries;
    var callback3 = function(err){
      if(err) throw err;
    }

    var ratingsToAdd = JSON.parse(fs.readFileSync('./completedRating.json', 'utf8')).completedRatingEntries;
    var callback4 = function(err){
      if(err) throw err;
    }

    for(var i = 0; i < usersToAdd.length; i++){
        new User(usersToAdd[i]).save(callback1);
    }
    for(var i = 0; i < teamsToAdd.length; i++){
        new Team(teamsToAdd[i]).save(callback2);
    }
    for(var i = 0; i < blankRubricToAdd.length; i++){
        new BlankRubric(blankRubricToAdd[i]).save(callback3);
    }
    for(var i = 0; i < ratingsToAdd.length; i++){
        new CompletedRating(ratingsToAdd[i]).save(callback4);
    }
    

  });
