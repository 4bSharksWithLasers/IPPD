'use strict';

//Affiliation service used for communicating with the completedRatings REST endpoints
angular.module('admin').factory('Affiliations', ['$resource',
  function ($resource) {
    return $resource('api/affiliations/:affiliationId', {
      affiliationId: '@_id'
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
