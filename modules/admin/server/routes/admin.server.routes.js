'use strict';

/**
 * Module dependencies.
 */
var adminPolicy = require('../policies/admin.server.policy'),
  admin = require('../controllers/admin-team.server.controller');

module.exports = function (app) {
  // admin collection routes
  app.route('/api/teams').all(adminPolicy.isAllowed)
    .get(admin.list)
    .post(admin.create);

  app.route('/api/teams/:teamId').all(adminPolicy.isAllowed)
    .get(teams.read)
    .put(teams.update)
    .delete(teams.delete);
  // Finish by binding the rubric middleware
  app.param('teamId', teams.teamById);

  //Route back to admin page after addTeam is complete.
  app.route('/api/addTeam').all(adminPolicy.isAllowed)
    .put(teams.create)
    .get(teams.list)
    .post(teams.create);

  app.route('/api/affiliations').all(adminPolicy.isAllowed)
    .get(affiliations.list)
    .post(affiliations.create);

  app.route('/api/addAffiliation').all(adminPolicy.isAllowed)
    .put(affiliations.create)
    .get(affiliations.list)
    .post(affiliations.create);

  app.route('/api/affiliations').all(adminPolicy.isAllowed)
    .get(admin.list)
    .post(admin.create);

  app.route('/api/addAffiliation').all(adminPolicy.isAllowed)
    .put(admin.create)
    .get(admin.list)
    .post(admin.create);

  //Single rubric routes
  // app.route('/api/rubrics/:rubricId').all(rubricsPolicy.isAllowed)
  //   .get(rubrics.read)
  //   .put(rubrics.update)
  //   .delete(rubrics.delete);

  
};
