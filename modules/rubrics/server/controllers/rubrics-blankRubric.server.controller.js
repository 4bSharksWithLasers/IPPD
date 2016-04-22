'use strict';

var mongoose = require('mongoose'),
  BlankRubric = mongoose.model('BlankRubric'), 
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

//CREATE a Blank Rubric
exports.create = function(req, res){
  //Instantiate a Blank Rubric
  var blankRubric = new BlankRubric(req.body);

  //save the blank rubric
  blankRubric.save(function(err){
    if(err){
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(blankRubric);
    }
  });
};

//READ a Blank rubric
exports.read = function(req, res){
  //send back the user as json from the request
  res.json(req.blankRubric);
};

//UPDATE a blank rubric
exports.update = function(req, res){
  var blankRubric = req.blankRubric;

  //replace the article's properties with the new properties found in req.body
  blankRubric.presentationType = req.body.presentationType; 
  blankRubric.instructions = req.body.instructions; 
  blankRubric.ratedItems = req.body.ratedItems; 

  //save the article
  blankRubric.save(function(err){
    if(err){
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(blankRubric);
    }
  });
};

//DELETE a blank rubric
exports.delete = function(req, res){
  var blankRubric = req.blankRubric; 

  //remove the article
  blankRubric.remove(function(err){
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

//Retrieve all blank rubrics, sorted alphabetically by presentationType
exports.list = function(req, res){
  BlankRubric.find().sort('presentationType').exec(function(err, blankRubrics){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(blankRubrics);
    }
  });
};

//Find a blank rubric by its ID and pass it to the next request handler
exports.blankRubricById = function(req, res, next, id){

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Blank Rubric is invalid'
    });
  }

  BlankRubric.findById(id).exec(function(err, blankRubric){
    if(err){
      res.status(400).send(err);
    }
      else{
      req.blankRubric = blankRubric;
      next();
    }
  });
};
