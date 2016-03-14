'use strict';

var should = require('should'),
  mongoose = require('mongoose'),
  Registrant = mongoose.model('Registrant'),
  Rubric = mongoose.model('CompletedRating');

var registrant, id, rub_id;

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
    rating: "3"
  }],
  issuesIdentified: "unitTestIssue",
  recommendedActions: [{
    recommendation: "unitTestRecommendation",
    urgency: false
  }]

};



describe('Schema Unit Tests', function() {

  describe('Saving Registrants to database',function(done) {

    it('Should save to the database when email, affiliation, and teamName provided', function(done){
      new Registrant({
        email: registrant.email,
        affiliation: registrant.affiliation,
        teamName: registrant.teamName
      }).save(function(err, registrant){
        should.not.exist(err);
        id = registrant._id;
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
    if(id) {
      Registrant.remove({ _id: id }).exec(function(){
        id = null;
        done();
      });
    } else {
      done();
    }
  });

  describe('Saving rubrics to the database', function(done){

  });

});
