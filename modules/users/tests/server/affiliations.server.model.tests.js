'use strict';

var should = require('should'),
  mongoose = require('mongoose'),
  Affiliation = mongoose.model('Affiliation');

var affiliation, aff_id;

affiliation = {
  theAffiliation : 'UnitAffiliation',
  codeAssociated: false,
  teamAssociated: true
};

describe('Affiliation Model Unit tests', function(done){

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

});
