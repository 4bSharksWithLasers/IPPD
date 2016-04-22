'use strict';

var should = require('should'),
  mongoose = require('mongoose'),
  Registrant = mongoose.model('Registrant');

var registrant, reg_id;

registrant = {
  email: 'unit@unitemail.com',
  affiliation: 'unitAffiliation',
  teamName: 'unit team'
};

describe('Registrants Model Unit Tests', function(done){

  this.timeout(10000);

  describe('Saving Registrants to database',function(done) {

    this.timeout(10000);

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

});
