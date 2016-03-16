'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  express = require(path.resolve('./config/lib/express')),
  Registrant = mongoose.model('Registrant'),
  Rubric = mongoose.model('CompletedRating');

var app, agent, registrant, _registrant, reg_id, new_reg_id, _rubric, rub_id;

_rubric = {
  team: "new_unitRubricTeam",
  presentationType: "new_unitPresentTest",
  email: "new_unitRubricEmailTest",
  ratedItems: [{
    rubricItem: "new_unitItemTest",
    rating: 3
  }],
  issuesIdentified: "new_unitTestIssue",
  recommendedActions: [{
    recommendation: "new_unitTestRecommendation",
    urgency: false
  }]

};

describe('Registrant CRUD tests', function(){

  before(function(done){
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function(done) {

    //create new registrant

    _registrant = {
      email: "unit@unitEmail.com",
      affiliation: "unitAffiliation",
      teamName: "unit team"
    };

    registrant = new Registrant(_registrant);



    //save registrant into the db

    registrant.save(function (err) {
      should.not.exist(err);
      reg_id = registrant._id;
      done();
    });


  });

  //registrant should be able to see team names and presentation types.

  it('Should be able to register a new registrant', function(done) {

    _registrant.email = "new_unit_registrant@unitEmail.com";
    _registrant.affiliation = "new_unit_affiliation";
    _registrant.teamName = "new_unit_team";

    agent.post('/api/registrants')
      .send(_registrant)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }

        res.body.email.should.equal(_registrant.email);
        res.body.affiliation.should.equal(_registrant.affiliation);
        res.body.teamName.should.equal(_registrant.teamName);
        new_reg_id = res.body._id;
        return done();

      });

  });
/*
  it('Should be able to get a list of presentation types', function(done){

  });

  it('Should be able to get a list of team names', function(done){

  });


  it('Should be able to get a blank Rubric', function(done){

  });
*/
  it('Should be able to submit a completed Rubric', function(done){


    agent.post('/api/completedRatings')
      .send(_rubric)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }

        res.body.team.should.equal(_rubric.team);
        res.body.presentationType.should.equal(_rubric.presentationType);
        res.body.email.should.equal(_rubric.email);
        rub_id = res.body._id;
        return done();

      });
  });
/*
  it('Admin should be able to add teams', function(done){

  });

  it('Admin should be able to update teams', function(done){

  });

  it('Admin should be able to remove teams', function(done){

  });

  it('Admin should be able to add affiliations', function(done){

  });

  it('Admin should be able to update affiliations', function(done){

  });

  it('Admin should be able to remove affiliation', function(done){

  });
*/

  //removes registrant from database

  afterEach(function(done){
    if(reg_id) {
      Registrant.remove({ _id: reg_id }).exec(function(){
        reg_id = null;
        done();
      });
    } else {
      done();
    }
  });

  //removes submitted registrants

  afterEach(function(done){
    if(new_reg_id) {
      Registrant.remove({ _id: new_reg_id }).exec(function(){
        new_reg_id = null;
        done();
      });
    } else {
      done();
    }
  });

  //TODO figure out api paths
  //removes submitted rubrics

  afterEach(function(done){
    if(rub_id) {
      Rubric.remove({ _id: rub_id }).exec(function(){
        rub_id = null;
        done();
      });
    } else {
      done();
    }
  });

});
