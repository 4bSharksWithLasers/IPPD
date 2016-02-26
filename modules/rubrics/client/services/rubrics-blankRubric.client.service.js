'use strict';

//BlankRubrics service used for communicating with the blankRubrics REST endpoints
angular.module('rubrics').factory('BlankRubrics', ['$resource',
  function ($resource) {
    return $resource('api/blankRubrics/:blankRubricId', {
      blankRubricId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
