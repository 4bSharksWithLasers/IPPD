'use strict';

//Registrants service used for communicating with the registrants REST endpoints
angular.module('registrants').factory('Registrants', ['$resource',
  function ($resource) {
    return $resource('api/registrants/:registrantId', {
      registrantId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
