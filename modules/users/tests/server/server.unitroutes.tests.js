'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  express = require(path.resolve('./config/lib/express')),
  Registrant = mongoose.model('Registrant');

var app, agent, registrant, id;

describe('Registrant CRUD tests', function(){

  before(function(done){
    app = express.init();
    agent = request.agent(app);

    done();
  });

  //registrant should be able to see team names and presentationtypes.

  it('Should be able to find list of team names', function(done) {
  //  agent.get();
  });

  it('Should be able to find a list of presentaion types', function(done){

  });

  it('Should be able to submit a completed Rubric', function(done){

  });

});
