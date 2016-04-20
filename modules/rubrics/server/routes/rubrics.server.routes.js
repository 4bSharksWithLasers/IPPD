'use strict';

/**
 * Module dependencies.
 */
var rubricsPolicy = require('../policies/rubrics.server.policy'),
  completedRatings = require('../controllers/rubrics-completedRating.server.controller'), 
  blankRubrics = require('../controllers/rubrics-blankRubric.server.controller');

module.exports = function (app) {
  // completedRatings collection routes
  app.route('/api/completedRatings').all(rubricsPolicy.isAllowed)
    .get(completedRatings.list)
    .post(completedRatings.create);

  //Route back to register page after registration is complete.
  app.route('/api/review').all(rubricsPolicy.isAllowed)
    .put(completedRatings.create);

  app.route('/api/blankRubrics').all(rubricsPolicy.isAllowed)
    .get(blankRubrics.list)
    .post(blankRubrics.create);

  //Single rubric routes
  app.route('/api/blankRubrics/:blankRubricId').all(rubricsPolicy.isAllowed)
    .get(blankRubrics.read)
    .put(blankRubrics.update)
    .delete(blankRubrics.delete);
  // Finish by binding the rubric middleware
  app.param('blankRubricId', blankRubrics.blankRubricById);
};
