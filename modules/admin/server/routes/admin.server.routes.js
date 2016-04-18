'use strict';

/**
 * Module dependencies.
 */
var adminPolicy = require('../policies/admin.server.policy'),
  teams = require('../controllers/admin-team.server.controller'), 
  affiliations = require('../controllers/admin-affiliation.server.controller'),
  csss = require('../controllers/admin-css.server.controller');

module.exports = function (app) {
  // admin collection routes
  app.route('/api/teams').all(adminPolicy.isAllowed)
    .get(teams.list)
    .post(teams.create);

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

  app.route('/api/affiliations/:affiliationId').all(adminPolicy.isAllowed)
    .get(affiliations.read)
    .put(affiliations.update)
    .delete(affiliations.delete);
  // Finish by binding the rubric middleware
  app.param('affiliationId', affiliations.affiliationById);

  app.route('/api/addAffiliation').all(adminPolicy.isAllowed)
    .put(affiliations.create)
    .get(affiliations.list)
    .post(affiliations.create);

  app.route('/api/teams/:teamId').all(adminPolicy.isAllowed)
    .get(teams.read)
    .put(teams.update)
    .delete(teams.delete);
  // Finish by binding the rubric middleware
  app.param('teamId', teams.teamById);

  app.route('/api/csss/:cssId').all(adminPolicy.isAllowed)
    .get(csss.read)
    .put(csss.update)
    .delete(csss.delete);
  // Finish by binding the rubric middleware
  app.param('cssId', csss.cssById);
};
