'use strict';

var mongoose = require('mongoose'), BlankRubric = require('../models/rubrics-blankRubric.server.model.js');

//CREATE a BlankRubric
exports.create = function(req, res) //Instantiate a BlankRubric
	{ var blankRubric = new BlankRubric(req.body); blankRubric.save(function(err) //save the blankRubric
	{ if(err)
		{ console.log(err); res.status(400).send(err);
		}
	else
		{ res.json(blankRubric);
		}
	});
};

//READ a blankRubric
exports.read = function(req, res)
{ res.json(req.blankRubric); //send back the blankRubric as json from the request
};

//UPDATE a blankRubric
exports.update = function(req, res)
	{ var blankRubric = req.blankRubric
		//replace the article's properties with the new properties found in req.body
		; blankRubric.presentationType = req.body.presentationType; blankRubric.instructions = req.body.instructions //not sure if the below line will work, due to the nested nature of the schema. figure this out later?
		; blankRubric.ratedItems = req.body.ratedItems; blankRubric.save(function(err) //save the article
		{ if(err)
			{ console.log(err); res.status(400).send(err);
			}
		else
			{ res.json(blankRubric);
			}
	});
};

//DELETE a blankRubric
exports.delete = function(req, res)
	{ var blankRubric = req.blankRubric; blankRubric.remove(function(err) //remove the article
		{ if(err)
			{ res.status(400).send(err);
		}
		else
		{ res.end();
		}
	});
};

//Retrieve all blankRubric, sorted alphabetically by presentationType
exports.list = function(req, res)
	{ BlankRubric.find().sort('presentationType').exec(function(err, blankRubrics)
		{ if(err)
			{ res.status(400).send(err);
			}
		else
			{ res.json(blankRubrics);
			}
	});
};

//Find a blankRubric by its ID and pass it to the next request handler
exports.blankRubricById = function(req, res, next, id)
	{ BlankRubric.findById(id).exec(function(err, blankRubric)
		{ if(err)
			{ res.status(400).send(err);
			}
		else
			{ req.blankRubric = blankRubric; next();
			}
	});
};
