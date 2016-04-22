<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 407e6c0844e126e4c28a90c9920a366fdd841b9f
'use strict';

/**
 * Module dependencies.
 */
var adminPolicy = require('../policies/admin.server.policy'),
  teams = require('../controllers/admin-team.server.controller'), 
  affiliations = require('../controllers/admin-affiliation.server.controller'),
  completedratings = require('../../../rubrics/server/controllers/rubrics-completedRating.server.controller.js'),
  themes = require('../controllers/admin-theme.server.controller');

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

  app.route('/api/theme').all(adminPolicy.isAllowed)
    .put(themes.create)
    .get(themes.list)
    .post(themes.create)
    .delete(themes.delete);

  app.route('/api/theme/:themeId').all(adminPolicy.isAllowed)
    .get(themes.read)
    .put(themes.update)
    .delete(themes.delete);
  // Finish by binding the rubric middleware
  app.param('themeId', themes.themeById);

};
<<<<<<< HEAD
=======
=======
'use strict';

/**
 * Module dependencies.
 */
var adminPolicy = require('../policies/admin.server.policy'),
  teams = require('../controllers/admin-team.server.controller'), 
  affiliations = require('../controllers/admin-affiliation.server.controller');

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
};
>>>>>>> 31be844c3aaa2c4cc56a4bb7dc09e1e032f8858d
>>>>>>> 407e6c0844e126e4c28a90c9920a366fdd841b9f
