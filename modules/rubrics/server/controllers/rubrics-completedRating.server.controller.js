<<<<<<< HEAD
'use strict';

var mongoose = require('mongoose'),
  CompletedRating = mongoose.model('CompletedRating'), 
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  fs = require('fs');

//CREATE a completed rating
exports.create = function(req, res){
  //Instantiate a completed rating
  var completedRating = new CompletedRating(req.body);

  //save the completed rating
  completedRating.save(function(err){
    if(err){
      console.log(err);
      console.log('error in server.controller');
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(completedRating);
    }
  });
};

//READ a completed rating
exports.read = function(req, res){
  //send back the user as json from the request
  res.json(req.completedRating);
};

//UPDATE a completed rating
exports.update = function(req, res){

  var completedRating = req.completedRating;

  // if (completedRating.created_by == thisUser)
  //REQUIRES USER SYSTEM TO CHECK IF USER OWNS THE COMPLETED RUBRIC AND IF SO ALLOW THEM TO MAKE CHANGES.

  //replace the article's properties with the new properties found in req.body
  completedRating.team = req.body.team; 
  completedRating.presentationType = req.body.presentationType;
  completedRating.email = req.body.email; 
  completedRating.ratedItems = req.body.ratedItems; 
  completedRating.issuesIdentified = req.body.issuesIdentified;
  completedRating.recommendedActions = req.body.recommendedActions;

  //save the article
  completedRating.save(function(err){
    if(err){
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(completedRating);
    }
  });
};

//DELETE a completed rating
exports.delete = function(req, res){
  var completedRating = req.completedRating; 

  //remove the article
  completedRating.remove(function(err){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.end();
    }
  });
};

//Retrieve all completed ratings, sorted alphabetically by team
exports.list = function(req, res){
  CompletedRating.find().sort('team').exec(function(err, completedRatings){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(completedRatings);
    }
  });
};

//Find a completed rating by its ID and pass it to the next request handler
exports.completedRatingById = function(req, res, next, id){

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Completed Rating is invalid'
    });
  }

  CompletedRating.findById(id).exec(function(err, completedRating){
    if(err){
      res.status(400).send(err);
    }
      else{
      req.completedRating = completedRating;
      next();
    }
  });
};

=======
'use strict';

var mongoose = require('mongoose'),
  CompletedRating = mongoose.model('CompletedRating'), 
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

//CREATE a completed rating
exports.create = function(req, res){
  //Instantiate a completed rating
  var completedRating = new CompletedRating(req.body);

  //save the completed rating
  completedRating.save(function(err){
    if(err){
      console.log(err);
      console.log('error in server.controller');
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(completedRating);
    }
  });
};

//READ a completed rating
exports.read = function(req, res){
  //send back the user as json from the request
  res.json(req.completedRating);
};

//UPDATE a completed rating
exports.update = function(req, res){

  var completedRating = req.completedRating;

  // if (completedRating.created_by == thisUser)
  //REQUIRES USER SYSTEM TO CHECK IF USER OWNS THE COMPLETED RUBRIC AND IF SO ALLOW THEM TO MAKE CHANGES.

  //replace the article's properties with the new properties found in req.body
  completedRating.team = req.body.team; 
  completedRating.presentationType = req.body.presentationType;
  completedRating.email = req.body.email; 
  completedRating.ratedItems = req.body.ratedItems; 
  completedRating.issuesIdentified = req.body.issuesIdentified;
  completedRating.recommendedActions = req.body.recommendedActions;

  //save the article
  completedRating.save(function(err){
    if(err){
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(completedRating);
    }
  });
};

//DELETE a completed rating
exports.delete = function(req, res){
  var completedRating = req.completedRating; 

  //remove the article
  completedRating.remove(function(err){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.end();
    }
  });
};

//Retrieve all completed ratings, sorted alphabetically by team
exports.list = function(req, res){
  CompletedRating.find().sort('team').exec(function(err, completedRatings){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(completedRatings);
    }
  });
};

//Find a completed rating by its ID and pass it to the next request handler
exports.completedRatingById = function(req, res, next, id){

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Completed Rating is invalid'
    });
  }

  CompletedRating.findById(id).exec(function(err, completedRating){
    if(err){
      res.status(400).send(err);
    }
      else{
      req.completedRating = completedRating;
      next();
    }
  });
};
>>>>>>> 31be844c3aaa2c4cc56a4bb7dc09e1e032f8858d
