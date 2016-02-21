'use strict';

var mongoose = require('mongoose'), Registrant = require('../models/registrant.server.model.js');
//NEED TO CHANGE THE FILE PATH

//CREATE a Registrant
exports.create = function(req, res) //Instantiate a Registrant
	{ var registrant = new Registrant(req.body); registrant.save(function(err) //save the registrant
	{ if(err)
		{ console.log(err); res.status(400).send(err);
		}
	else
		{ res.json(registrant);
		}
	});
};

//READ a registrant
exports.read = function(req, res) //send back the user as json from the request
	{ res.json(req.registrant);
};

//UPDATE a registrant
exports.update = function(req, res)
	{ var registrant = req.registrant //replace the article's properties with the new properties found in req.body
		;registrant.email = req.body.email; registrant.affiliation = req.body.affiliation; registrant.teamName = req.body.teamName; registrant.save(function(err) //save the article
	{ if(err)
		{ console.log(err); res.status(400).send(err);
		}
	else 
		{ res.json(registrant);
		}
	});
};

//DELETE a registrant
exports.delete = function(req, res)
	{ var registrant = req.registrant; registrant.remove(function(err) //remove the article
	{ if(err)
		{ res.status(400).send(err);
		}
	else
		{ res.end();
		}
	});
};

//Retrieve all registrant, sorted alphabetically by email
exports.list = function(req, res)
	{ Registrant.find().sort('email').exec(function(err, registrants)
		{ if(err)
			{ res.status(400).send(err);
			}
		else
			{ res.json(registrants);
			}
	});
};


exports.registrantById = function(req, res, next, id) //Find a registrant by its ID and pass it to the next request handler
	{ Registrant.findById(id).exec(function(err, registrant)
		{ if(err)
			{ res.status(400).send(err);
			}
		else
			{ req.registrant = registrant; next();
			}
	});
};
