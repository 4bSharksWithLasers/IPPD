'use strict';

var mongoose = require('mongoose'),
  Affiliation = mongoose.model('Affiliation'), 
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

//CREATE a affiliation
exports.create = function(req, res){
  //Instantiate a affiliation
  var affiliation = new Affiliation(req.body);

  //save the affiliation
  affiliation.save(function(err){
    if(err){
      console.log(err);
      console.log('error in server.controller');
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(affiliation);
    }
  });
};

//READ a affiliation
exports.read = function(req, res){
  //send back the user as json from the request
  res.json(req.affiliation);
};

//UPDATE a affiliation
exports.update = function(req, res){
  var addAffiliation = req.affiliation;

  //replace the article's properties with the new properties found in req.body
  addAffiliation.affiliation = req.body.affiliation; 

  //save the article
  addAffiliation.save(function(err){
    if(err){
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(addAffiliation);
    }
  });
};

//DELETE a affiliation
exports.delete = function(req, res){
  var affiliation = req.affiliation; 

  //remove the article
  affiliation.remove(function(err){
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

//Retrieve all affiliations, sorted alphabetically by affiliation
exports.list = function(req, res){
  Affiliation.find().sort('affiliation').exec(function(err, affiliations){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(affiliations);
    }
  });
};

//Find a affiliation by its ID and pass it to the next request handler
exports.affiliationById = function(req, res, next, id){

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Affiliation is invalid'
    });
  }

  Affiliation.findById(id).exec(function(err, affiliation){
    if(err){
      res.status(400).send(err);
    }
      else{
      req.affiliation = affiliation;
      next();
    }
  });
};
