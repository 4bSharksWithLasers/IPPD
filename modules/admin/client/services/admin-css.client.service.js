'use strict';

//Css service used for communicating with the team REST endpoints
angular.module('admin').factory('CssList', ['$resource',
  function ($resource) {
    return $resource('api/csss/:cssId', {
      cssId: '@_id'
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
