'use strict';

// Setting up route
angular.module('admin').config(['$stateProvider',
  function ($stateProvider) {
    // admin state routing
    $stateProvider
      .state('teams', {
        abstract: true,
        url: '/teams',
        template: '<ui-view/>',
        data:{
          roles:['admin']
        }
      })
      .state('teams.list', {
        url: '',
        templateUrl: 'modules/admin/client/views/listTeams-admin.client.view.html',
        params:{
          successMessage: null
        }, 
        data:{
          roles:['admin']
        }
      })
      .state('teams.view', {
        url: '/:teamId',
        templateUrl: 'modules/admin/client/views/viewTeam-admin.client.view.html',
        data:{
          roles:['admin']
        }
      })
      .state('teams.edit', {
        url: '/:teamId',
        templateUrl: 'modules/admin/client/views/editTeam-admin.client.view.html',
        data:{
          roles:['admin']
        }
      })
      .state('addTeam',{
        url: '/addTeam', 
        templateUrl: 'modules/admin/client/views/addTeam-admin.client.view.html',
        data:{
          roles:['admin']
        }
      })
      .state('theme', {
        url: '/theme',
        templateUrl: 'modules/admin/client/views/theme-admin.client.view.html',
        data:{
          roles:['admin']
        }
      })		  
      .state('affiliations', {
        abstract: true,
        url: '/affiliations',
        template: '<ui-view/>',
        data:{
          roles:['admin']
        }
      })
      .state('affiliations.list', {
        url: '',
        templateUrl: 'modules/admin/client/views/listAffiliations-admin.client.view.html',
        params:{
          successMessage: null
        }, 
        data:{
          roles:['admin']
        }
      })
      .state('affiliations.view', {
        url: '/:affiliationId',
        templateUrl: 'modules/admin/client/views/viewAffiliation-admin.client.view.html',
        data:{
          roles:['admin']
        }
      })
      .state('affiliations.edit', {
        url: '/:affiliationId',
        templateUrl: 'modules/admin/client/views/editAffiliation-admin.client.view.html',
        data:{
          roles:['admin']
        }
      })
      .state('addAffiliation',{
        url: '/addAffiliation', 
        templateUrl: 'modules/admin/client/views/addAffiliation-admin.client.view.html',
        data:{
          roles:['admin']
        }
      })
      .state('adminHome', {
        url:'/adminHome', 
        templateUrl: 'modules/admin/client/views/adminHome-admin.client.view.html',
        data:{
          roles:['admin']
        }
      })
      .state('adminLogin', {
        url:'/adminLogin', 
        templateUrl: 'modules/admin/client/views/adminLogin-admin.client.view.html'
      });
  }
]);
