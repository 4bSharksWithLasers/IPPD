'use strict';

/**
 * Module dependencies.
 */
var registrantsPolicy = require('../policies/registrants.server.policy'),
  registrants = require('../controllers/registrants.server.controller');

module.exports = function (app) {
  // registrants collection routes
  app.route('/api/registrants').all(registrantsPolicy.isAllowed)
    .get(registrants.list)
    .post(registrants.create);

  //Route back to register page after registration is complete.
  app.route('/api/register').all(registrantsPolicy.isAllowed)
    .put(registrants.create);

  app.route('/api/registrants/:registrantId').all(registrantsPolicy.isAllowed)
    .get(registrants.read)
    .put(registrants.update)
    .delete(registrants.delete);
  // Finish by binding the rubric middleware
  app.param('registrantId', registrants.registrantById);
};
