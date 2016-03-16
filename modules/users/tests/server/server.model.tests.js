'use strict';

var should = require('should'),
  mongoose = require('mongoose'),
  Affiliation = mongoose.model('Affiliation'),
  Team = mongoose.model('Team'),
  Registrant = mongoose.model('Registrant'),
  Rubric = mongoose.model('CompletedRating');

var registrant, rubric, affiliation, team, reg_id, rub_id, aff_id, t_id;

registrant = {
  email: "unit@unitemail.com",
  affiliation: "unitAffiliation",
  teamName: "unit team"
};

rubric = {
  team: "unitRubricTeam",
  presentationType: "unitPresentTest",
  email: "unitRubricEmailTest",
  ratedItems: [{
    rubricItem: "unitItemTest",
    rating: 3
  }],
  issuesIdentified: "unitTestIssue",
  recommendedActions: [{
    recommendation: "unitTestRecommendation",
    urgency: false
  }]

};

affiliation = {
  theAffiliation : "UnitAffiliation",
  codeAssociated: false,
  teamAssociated: true
};


team = {
  name: "UnitTeam",
  code: 1234,
};



describe('Schema Unit Tests', function() {

  /*
      Makes sure all the correct values are saved properly into the Mongo database.
  */

  describe('Saving Registrants to database',function(done) {

    it('Should save to the database when email, affiliation, and teamName provided', function(done){
      new Registrant({
        email: registrant.email,
        affiliation: registrant.affiliation,
        teamName: registrant.teamName
      }).save(function(err, registrant){
        should.not.exist(err);
        reg_id = registrant._id;
        done();
      });
    });

    it('Should not save to db if not all three are provided',function(done){
      new Registrant({
        email: registrant.email
      }).save(function(err){
        should.exist(err);
        done();
      });
    });


  });

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

  describe('Saving rubrics to the database', function(done){
    it('Should save to the db when team, presentation type, and email are provided', function(done){
      new Rubric({
        team: rubric.team,
        presentationType: rubric.presentationType,
        email: rubric.email
      }).save(function(err, rubric){
        should.not.exist(err);
        rub_id = rubric._id;
        done();
      });
    });

    it('Should not save if team, presentation type, or email are missing', function(done){
      new Rubric({
        team: rubric.team
      }).save(function(err){
        should.exist(err);
        done();
      });
    });

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

  describe('Saving affiliations to the database', function(done){

    it('Should save to the db if theAffiliation is provided', function(done){
      new Affiliation({
        theAffiliation: affiliation.theAffiliation,
        codeAssociated: affiliation.codeAssociated,
        teamAssociated: affiliation.teamAssociated
      }).save(function(err, affiliation){
        should.not.exist(err);
        aff_id = affiliation._id;
        done();
      });
    });

    it('Should not save to the db if theAffiliation is not provided', function(done){
      new Affiliation({
        codeAssociated: affiliation.codeAssociated
      }).save(function(err){
        should.exist(err);
        done();
      });
    });

    afterEach(function(done){
      if(aff_id) {
        Affiliation.remove({ _id: aff_id }).exec(function(){
          aff_id = null;
          done();
        });
      } else {
        done();
      }
    });

  });

  describe('Saving teams to the database', function(done){

    it('Should save if type and code are both provided', function(done){
      new Team({
        name: team.name,
        code: team.code,
      }).save(function(err, team){
        should.not.exist(err);
        t_id = team._id;
        done();
      });
    });

    it('Should not save if type and code are not both provided', function(done){
      new Team({
        name: team.name
      }).save(function(err){
        should.exist(err);
        done();
      });
    });

    afterEach(function(done){
      if(t_id) {
        Team.remove({ _id: t_id }).exec(function(){
          t_id = null;
          done();
        });
      } else {
        done();
      }
    });

    //TODO ask about team name uniqueness

  });

});
