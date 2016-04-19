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
      resources: '/api/completedRatings',
      permissions: '*'
    }, {
      resources: '/api/completedRatings/:completedRatingId',
      permissions: '*'
    }, {
      resources: '/api/review',
      permissions: '*'
    }, {
      resources: '/api/blankRubrics',
      permissions: '*'
    }, {
      resources: '/api/blankRubrics/:blankRubricId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/completedRatings',
      permissions: ''
    }, {
      resources: '/api/completedRatings/:completedRatingId',
      permissions: ''
    }, {
      resources: '/api/review',
      permissions: ''
    }, {
      resources: '/api/blankRubrics',
      permissions: ''
    }, {
      resources: '/api/blankRubrics/:blankRubricId',
      permissions: ''
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/completedRatings',
      permissions: 'post'
    }, {
      resources: '/api/completedRatings/:completedRatingId',
      permissions: ''
    }, {
      resources: '/api/review',
      permissions: ''
    }, {
      resources: '/api/blankRubrics',
      permissions: 'get'
    }, {
      resources: '/api/blankRubrics/:blankRubricId',
      permissions: 'get'
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
