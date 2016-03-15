'use strict';

// Setting up route
angular.module('admin').config(['$stateProvider',
  function ($stateProvider) {
    // admin state routing
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
      .state('teams.view', {
        url: '/:teamId',
        templateUrl: 'modules/admin/client/views/viewTeam-admin.client.view.html'
      })
      .state('teams.edit', {
        url: '/:teamId',
        templateUrl: 'modules/admin/client/views/editTeam-admin.client.view.html'
      })
      .state('addTeam',{
        url: '/addTeam', 
        templateUrl: 'modules/admin/client/views/addTeam-admin.client.view.html'
      })
      .state('affiliations', {
        abstract: true,
        url: '/affiliations',
        template: '<ui-view/>'
      })
      .state('affiliations.list', {
        url: '',
        templateUrl: 'modules/admin/client/views/listAffiliations-admin.client.view.html'
      })
      .state('affiliations.view', {
        url: '/:affiliationId',
        templateUrl: 'modules/admin/client/views/viewAffiliation-admin.client.view.html'
      })
      .state('affiliations.edit', {
        url: '/:affiliationId',
        templateUrl: 'modules/admin/client/views/editAffiliation-admin.client.view.html'
      })
      .state('addAffiliation',{
        url: '/addAffiliation', 
        templateUrl: 'modules/admin/client/views/addAffiliation-admin.client.view.html'
      })
	  .state('theme', {
        url:'/theme', 
        templateUrl: 'modules/admin/client/views/editTheme-admin.client.view.html'
      })
      .state('adminHome', {
        url:'/adminHome', 
        templateUrl: 'modules/admin/client/views/adminHome-admin.client.view.html'
      })
      .state('adminLogin', {
        url:'/adminLogin', 
        templateUrl: 'modules/admin/client/views/adminLogin-admin.client.view.html'
      });

  }
]);
