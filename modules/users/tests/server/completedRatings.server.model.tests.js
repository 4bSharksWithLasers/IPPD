'use strict';

var should = require('should'),
  mongoose = require('mongoose'),
  CompletedRating = mongoose.model('CompletedRating');

var completedRating, cr_id;

completedRating = {
  team: 'unitCompletedRatingTeam',
  presentationType: 'unitPresentTest',
  email: 'unitCompletedRatingEmailTest',
  ratedItems: [{
    rubricItem: 'unitItemTest',
    rating: 3
  }],
  issuesIdentified: 'unitTestIssue',
  recommendedActions: [{
    recommendation: 'unitTestRecommendation',
    urgency: false
  }]

};

describe('Completed Ratings Unit Model Tests', function(done){

  describe('Saving completed Ratings to the database', function(done){
    it('Should save to the db when team, presentation type, and email are provided', function(done){
      new CompletedRating({
        team: completedRating.team,
        presentationType: completedRating.presentationType,
        email: completedRating.email
      }).save(function(err, completedRating){
        should.not.exist(err);
        cr_id = completedRating._id;
        done();
      });
    });

    it('Should not save if team, presentation type, or email are missing', function(done){
      new CompletedRating({
        team: completedRating.team
      }).save(function(err){
        should.exist(err);
        done();
      });
    });

    afterEach(function(done){
      if(cr_id) {
        CompletedRating.remove({ _id: cr_id }).exec(function(){
          cr_id = null;
          done();
        });
      } else {
        done();
      }
    });

  });

});
