'use strict';

//CompletedRatings service used for communicating with the completedRatings REST endpoints
angular.module('rubrics').factory('CompletedRatings', ['$resource',
  function ($resource) {
    return $resource('api/completedRatings/:completedRatingId', {
      registrantId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
