'use strict';

var mongoose = require('mongoose'),
  Css = mongoose.model('Css'), 
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

//CREATE a css
exports.create = function(req, res){
  //Instantiate a tcss
  var css = new Css(req.body);

  //save the css
  css.save(function(err){
    if(err){
      console.log(err);
      console.log('error in server.controller');
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(css);
    }
  });
};

//READ a css
exports.read = function(req, res){
  //send back the user as json from the request
  res.json(req.css);
};

//UPDATE a css
exports.update = function(req, res){
  var css = req.css;

  //replace the article's properties with the new properties found in req.body
  css.currentHeader = req.body.currentHeader; 
  css.currentBody = req.body.currentBody; 
  css.currentFont = req.body.currentFont; 

  //save the article
  css.save(function(err){
    if(err){
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(css);
    }
  });
};

//DELETE a css
exports.delete = function(req, res){
  var css = req.css; 

  //remove the article
  css.remove(function(err){
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

//Retrieve all teams, sorted alphabetically by team
exports.list = function(req, res){
  Css.find().sort('css').exec(function(err, cssList){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(cssList);
    }
  });
};

//Find a team by its ID and pass it to the next request handler
exports.cssById = function(req, res, next, id){

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Css is invalid'
    });
  }

  Css.findById(id).exec(function(err, css){
    if(err){
      res.status(400).send(err);
    }
      else{
      req.css = css;
      next();
    }
  });
};
