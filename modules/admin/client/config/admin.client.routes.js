'use strict';

// Setting up route
angular.module('admin').config(['$stateProvider',
  function ($stateProvider) {
    // rubrics state routing
    $stateProvider
      .state('teams', {
        abstract: true,
        url: '/teams',
        template: '<ui-view/>'
      })
      .state('teams.list', {
        url: '',
        templateUrl: 'modules/admin/client/views/listTeams-admin.client.view.html'
      })
      .state('addTeam',{
        url: '/addTeam', 
        templateUrl: 'modules/admin/client/views/addTeam-admin.client.view.html'
      });
  }
]);
