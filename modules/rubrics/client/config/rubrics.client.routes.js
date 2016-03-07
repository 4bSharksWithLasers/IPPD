'use strict';

// Setting up route
angular.module('rubrics').config(['$stateProvider',
  function ($stateProvider) {
    // rubrics state routing
    $stateProvider
      .state('rubrics', {
        abstract: true,
        url: '/rubrics',
        template: '<ui-view/>'
      })
      .state('rubrics.list', {
        url: '',
        templateUrl: 'modules/rubrics/client/views/list-rubrics.client.view.html'
      })
      .state('review',{
        url: '/review/:blankRubricId', 
        templateUrl: 'modules/rubrics/client/views/review-rubrics.client.view.html'
      })
      .state('selectPresentation',{
        url: '/selectPresentation', 
        templateUrl: 'modules/rubrics/client/views/teamPresentationSelection-rubrics.client.view.html'
      })
      .state('blankRubrics',{
        url: '/blankRubrics', 
        templateUrl: 'modules/rubrics/client/views/listBlankRubrics-rubrics.client.view.html'
      });
      // .state('blankRubrics.review',{
      //   url: '/:blankRubricId', 
      //   templateUrl: 'modules/rubrics/client/views/review-rubrics.client.view.html'
      // });
  }
]);
