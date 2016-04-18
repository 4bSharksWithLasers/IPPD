'use strict';

//Team service used for communicating with the team REST endpoints
angular.module('admin').factory('Themes', ['$resource',
  function ($resource) {
    return $resource('api/themes/:themeId', {
      themeId: '@_id'
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
