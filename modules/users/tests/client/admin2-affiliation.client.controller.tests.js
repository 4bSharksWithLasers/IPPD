// 'use strict';
//
// describe('Admin Affiliation Controller Tests', function(){
//   var $scope, ctrl, $resource, $stateParams, $location;
//   var affMock;
//   beforeEach(function(){
//     affMock = jasmine.createSpyObj('Affiliations');
//     module('admin');
//
//     //injected
//     inject(function($rootScope, $controller, $resource){
//       //scope object we use
//       //_$resource flushes out unresolved promises
//       $scope = $rootScope.$new();
//
//       //create a resolved promise to "weee"
//       //our returns
//       affMock.Affiliations.andReturn($resource.when('weee'));
// //$timeout = _$timeout_;
//
//       ctrl = $controller('AffiliationController',{
//         $scope: $scope,
//         Affilations: affMock
//       });
//     });
//   });
//
//   it('should do something when I call it.', function(){
//     $scope.affiliations = ['whatwhatwhat'];
//     $scope.create(true);
//     expect($scope.affilations).toEqual('whatwhatwhat');
//   });
//
//
//
// });
