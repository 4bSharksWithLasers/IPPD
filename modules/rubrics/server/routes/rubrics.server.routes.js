'use strict';

/**
 * Module dependencies.
 */
var rubricsPolicy = require('../policies/rubrics.server.policy'),
  rubrics = require('../controllers/rubrics-completedRating.server.controller');

module.exports = function (app) {
  // rubrics collection routes
  app.route('/api/completedRatings').all(rubricsPolicy.isAllowed)
    .get(rubrics.list)
    .post(rubrics.create);

  //Route back to register page after registration is complete.
  app.route('/api/review').all(rubricsPolicy.isAllowed)
    .put(rubrics.create);

  //Single rubric routes
  // app.route('/api/rubrics/:rubricId').all(rubricsPolicy.isAllowed)
  //   .get(rubrics.read)
  //   .put(rubrics.update)
  //   .delete(rubrics.delete);

  // Finish by binding the rubric middleware
  //app.param('rubricId', rubrics.rubricByID);
};
