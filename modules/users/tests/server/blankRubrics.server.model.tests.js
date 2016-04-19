'use strict';

var should = require('should'),
  mongoose = require('mongoose'),
  BlankRubric = mongoose.model('BlankRubric');

var blankRubric, br_id;

blankRubric = {
  presentationType: 'unitPresentTest',
  instructions: 'unitTestInstructions',
  ratedItems:[{
    itemCategory: 'unitItemCategory test',
    description1: 'unitDescription1',
    description2: 'unitDescription2',
    description3: 'unitDescription3'
  }]

};

describe('Blank Rubric Unit Model Tests', function(done){

  this.timeout(10000);

  describe('Saving blank rubrics to the database', function(done){

    this.timeout(10000);

    it('Should save to the db when all fields (type, instructions, rated items) are provided', function(done){
      new BlankRubric({
        presentationType: blankRubric.presentationType,
        instructions: blankRubric.instructions,
        ratedItems: blankRubric.ratedItems
      }).save(function(err, blankRubric){
        should.not.exist(err);
        br_id = blankRubric._id;
        done();
      });
    });

    it('Should not save if any of the fields are missing', function(done){
      new BlankRubric({
        instructions: blankRubric.instructions
      }).save(function(err){
        should.exist(err);
        done();
      });
    });

    afterEach(function(done){
      if(br_id) {
        BlankRubric.remove({ _id: br_id }).exec(function(){
          br_id = null;
          done();
        });
      } else {
        done();
      }
    });

  });

});
