'use strict';

// Setting up route
angular.module('registrants').config(['$stateProvider',
  function ($stateProvider) {
    // registrants state routing
    $stateProvider
      .state('registrants', {
        abstract: true,
        url: '/registrants',
        template: '<ui-view/>'
      })
      .state('registrants.list', {
        url: '',
        templateUrl: 'modules/registrants/client/views/list-registrants.client.view.html'
      })
      .state('register',{
        url: '/register', 
        templateUrl: 'modules/registrants/client/views/register-registrants.client.view.html'
      })
      .state('registrants.view', {
        url: '/:registrantId',
        templateUrl: 'modules/registrants/client/views/viewRegistrant-registrants.client.view.html'
      })
      .state('registrants.edit', {
        url: '/:registrantId',
        templateUrl: 'modules/registrants/client/views/editRegistrant-registrants.client.view.html'
      });
  }
]);
