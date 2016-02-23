'use strict';

//Team service used for communicating with the completedRatings REST endpoints
angular.module('admin').factory('Teams', ['$resource',
  function ($resource) {
    return $resource('api/teams/:teamId', {
      registrantId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      query: {
        method:'GET',
        isArray: true
      }
    });
  }
]);
