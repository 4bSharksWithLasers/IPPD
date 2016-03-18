'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke registrants Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/registrants',
      permissions: '*'
    }, {
      resources: '/api/register',
      permissions: '*'
    }, {
      resources: '/api/registrants/:registrantId',
      permissions: ['*']
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/registrants',
      permissions: ['get', 'post']
    }, {
      resources: '/api/register',
      permissions: ['get', 'post']
    }, {
      resources: '/api/registrants/:registrantId',
      permissions: ['*']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/registrants',
      permissions: ['get', 'post']
    }, {
      resources: '/api/register',
      permissions: ['get', 'post']
    }, {
      resources: '/api/registrants/:registrantId',
      permissions: ['*']
    }]
  }]);
};

/**
 * Check If registrants Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an registrant is being processed and the current user created it then allow any manipulation
  if (req.registrant && req.user && req.registrant.user && req.registrant.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred.
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
