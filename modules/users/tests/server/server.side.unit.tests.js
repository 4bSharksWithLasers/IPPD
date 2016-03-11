'use strict';

var should = require('should'),
  mongoose = require('mongoose'),
  request = require('supertest'),
  path = require('path'),
  express = require(path.resolve('./config/lib/express')),
  Affiliation = mongoose.model('Affiliation'),
  team = mongoose.model('Team'),
  user = mongoose.model('User');


var agent, _affiliation, testdummy;

describe('Server Unit Tests:', function (){

  before(function (done) {
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    _user = {
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    };
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  //Admin CRUD functionality

  describe('Add user:', function(){

    it('Should be able to add users to database', function(){

    });
  });

  describe('Delete user:', function(){

    it('Should be able to delete users to database', function(){

    });
  });

  describe('Add liason:', function(){

    it('Should be able to add liasons to database', function(){

    });
  });

  describe('Delete liason:', function(){

    it('Should be able to delete liasons to database', function(){

    });
  });

  describe('Add team:', function(){

    it('Should be able to add teams to database', function(){

    });
  });

  describe('Delete team:', function(){

    it('Should be able to delete teams to database', function(){

    });

  });

  describe('Add affiliation:', function(){
    before(function(done){
      _affiliation = {
        theAffiliation: 'Test1',
        codeAssociated: true,
        teamAssociated: true
      };
    })

    //affiliation = new Affiliation(_affiliation);

    it('Should be able to add affiliations to database', function(){

    });

  });

  describe('Delete affiliation:', function(){

    it('Should be able to delete affiliations to database', function(){

    });

  });
});
