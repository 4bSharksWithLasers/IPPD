'use strict';

var mongoose = require('mongoose'),
  Registrant = mongoose.model('Registrant'), 
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

//CREATE a Registrant
exports.create = function(req, res){
  //Instantiate a Registrant
  var registrant = new Registrant(req.body);
  var message = null; 

  //save the registrant
  registrant.save(function(err){
    if(err){
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(registrant);
    }
  });
};

//READ a registrant
exports.read = function(req, res){
  //send back the user as json from the reque
  res.json(req.registrant);
};

//UPDATE a registrant
exports.update = function(req, res){
  var registrant = req.registrant;

  //replace the article's properties with the new properties found in req.body
  registrant.email = req.body.email; 
  registrant.affiliation = req.body.affiliation; 
  registrant.teamName = req.body.teamName; 

  //save the article
  registrant.save(function(err){
    if(err){
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(registrant);
    }
  });
};

//DELETE a registrant
exports.delete = function(req, res){
  var registrant = req.registrant; 

  //remove the article
  registrant.remove(function(err){
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

//Retrieve all registrant, sorted alphabetically by email
exports.list = function(req, res){
  Registrant.find().sort('email').exec(function(err, registrants){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(registrants);
    }
  });
};

//Find a registrant by its ID and pass it to the next request handler
exports.registrantById = function(req, res, next, id){

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Registrant is invalid'
    });
  }

  Registrant.findById(id).exec(function(err, registrant){
    if(err){
      res.status(400).send(err);
    }
      else{
      req.registrant = registrant;
      next();
    }
  });
};
