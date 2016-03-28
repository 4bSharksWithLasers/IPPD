'use strict';

// Setting up route
angular.module('rubrics').config(['$stateProvider',
  function ($stateProvider) {
    // rubrics state routing
    $stateProvider
      .state('rubrics', {
        abstract: true,
        url: '/rubrics',
        template: '<ui-view/>',
        data:{
          roles:['admin']
        }
      })
      .state('review',{
        url: '/review/:blankRubricId',
        params: {
          team: null,
          presentation: null,
          email: null, 
          theId: null
        },
        templateUrl: 'modules/rubrics/client/views/review-rubrics.client.view.html'
      })
      .state('selectPresentation',{
        url: '/selectPresentation',
        params: {
          email: null,
          affiliation: null, 
          presentation: null, 
          theId: null
        },
        templateUrl: 'modules/rubrics/client/views/teamPresentationSelection-rubrics.client.view.html'
      })
      .state('blankRubrics',{
        abstract: true,
        url: '/blankRubrics',
        template: '<ui-view/>',
        data:{
          roles:['admin']
        }
      })
      .state('blankRubrics.list',{
        url: '',
        templateUrl: 'modules/rubrics/client/views/listBlankRubrics-rubrics.client.view.html',
        data:{
          roles:['admin']
        }
      })
      .state('blankRubrics.view',{
        url: '/:blankRubricId',
        templateUrl: 'modules/rubrics/client/views/viewBlankRubric-rubrics.client.view.html',
        data:{
          roles:['admin']
        }
      })
      .state('blankRubrics.edit',{
        url: '/:blankRubricId',
        templateUrl: 'modules/rubrics/client/views/editBlankRubric-rubrics.client.view.html',
        data:{
          roles:['admin']
        }
      })
      .state('addBlankRubric',{
        url: '/addBlankRubric',
        templateUrl: 'modules/rubrics/client/views/addBlankRubric-rubrics.client.view.html',
        data:{
          roles:['admin']
        }
      });

      // .state('blankRubrics.review',{
      //   url: '/:blankRubricId',
      //   templateUrl: 'modules/rubrics/client/views/review-rubrics.client.view.html'
      // });
  }
]);
