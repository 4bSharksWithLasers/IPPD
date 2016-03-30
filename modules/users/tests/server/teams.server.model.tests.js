'use strict';

var should = require('should'),
  mongoose = require('mongoose'),
  Team = mongoose.model('Team');

var team, t_id;

team = {
  name: 'UnitTeam',
  code: 1234
};


describe('Team model Unit Tests', function(done){

  this.timeout(10000);

  describe('Saving teams to the database', function(done){

    this.timeout(10000);

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


  });

});
