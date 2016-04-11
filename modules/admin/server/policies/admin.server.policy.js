'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke rubrics Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/teams',
      permissions: '*'
    }, {
      resources: '/api/affiliations',
      permissions: '*'
    }, {
      resources: '/api/teams/:teamId',
      permissions: '*'
    }, {
      resources: '/api/affiliations/:affiliationId',
      permissions: '*'
    }, {
      resources: '/api/exportCSV',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/teams',
      permissions: ''
    }, {
      resources: '/api/affiliations',
      permissions: ''
    }, {
      resources: '/api/teams/:teamId',
      permissions: ''
    }, {
      resources: '/api/affiliations/:affiliationId',
      permissions: ''
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/teams',
      permissions: ['get']
    }, {
      resources: '/api/affiliations',
      permissions: ['get']
    }, {
      resources: '/api/teams/:teamId',
      permissions: ['']
    }, {
      resources: '/api/affiliations/:affiliationId',
      permissions: ['']
    }]
  }]);
};

/**
 * Check If rubrics Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If a rubric is being processed and the current user created it then allow any manipulation
  if (req.rubrics && req.user && req.rubrics.user && req.rubrics.user.id === req.user.id) {
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
