'use strict';

// Protractor configuration
var config = {
  specs: ['modules/*/tests/e2e/*.js']
};

if (process.env.TRAVIS) {
  config.capabilities = {
    browserName: 'Chrome'
  };
}



exports.config = config;
  // beforeLaunch: function(){
  //   var mongoose = require('mongoose'),
  //     Affiliation = mongoose.model('Affiliation'),
  //     BlankRubric = mongoose.model('BlankRubric'),
  //     CompletedRating = mongoose.model('CompletedRating'),
  //     Team = mongoose.model('Team');
  //
  //   var affiliation, affiliation2, blankRubric, completedRating, team;
  //
  //   team = {
  //     name: 'e2eUnitTeam1'
  //   };
  //
  //   affiliation = {
  //     theAffiliation : 'e2eUnitAffiliation'
  //   };
  //
  //   affiliation2 = {
  //     theAffiliation : 'e2eUnitAffiliation2'
  //   };
  //
  //
  //   blankRubric = {
  //     presentationType: 'e2eunitPresentTest',
  //     instructions: 'e2eunitTestInstructions',
  //     ratedItems:[{
  //       itemCategory: 'e2eunitItemCategory test',
  //       description1: 'e2eunitDescription1',
  //       description2: 'e2eunitDescription2',
  //       description3: 'e2eunitDescription3'
  //     }]
  //
  //   };
  //
  //   completedRating = {
  //     team: 'e2eunitCompletedRatingTeam',
  //     presentationType: 'e2eunitPresentTest',
  //     email: 'e2eunitCompletedRatingEmailTest',
  //     ratedItems: [{
  //       rubricItem: 'e2eunitItemTest',
  //       rating: 3
  //     }],
  //     issuesIdentified: 'e2eunitTestIssue',
  //     recommendedActions: [{
  //       recommendation: 'e2eunitTestRecommendation',
  //       urgency: false
  //     }]
  //
  //   };
  //   new Affiliation(affiliation).save(function (done){done();});
  //   new Affiliation(affiliation2).save(function(done){done();});
  // };
