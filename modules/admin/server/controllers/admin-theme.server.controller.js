'use strict';

var mongoose = require('mongoose'),
  Theme = mongoose.model('Theme'), 
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

//CREATE a theme
exports.create = function(req, res){
  //Instantiate a theme
  var theme = new Theme(req.body);

  //save the theme
  theme.save(function(err){
    if(err){
      console.log(err);
      console.log('error in server.controller');
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(theme);
    }
  });
};

//DELETE a theme
exports.delete = function(req, res){
  var theme = req.theme; 

  //remove the article
  theme.remove(function(err){
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

//READ a theme
exports.read = function(req, res){
  //send back the theme as json from the request
  res.json(req.team);
};

//UPDATE a theme
exports.update = function(req, res){
  var theme = req.theme;

  //replace the article's properties with the new properties found in req.body
  theme.headerColor = req.body.headerColor;
  theme.bodyColor = req.body.bodyColor;
  theme.fontColor = req.body.fontColor;

  //save the article
  theme.save(function(err){
    if(err){
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(theme);
    }
  });
};


//Retrieve all themes, sorted alphabetically by theme
exports.list = function(req, res){
  Theme.find().sort('theme').exec(function(err, themes){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
      else{
      res.json(themes);
    }
  });
};

//Find a theme by its ID and pass it to the next request handler
exports.themeById = function(req, res, next, id){

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Theme is invalid'
    });
  }

  Theme.findById(id).exec(function(err, theme){
    if(err){
      res.status(400).send(err);
    }
      else{
      req.theme = theme;
      next();
    }
  });
};
