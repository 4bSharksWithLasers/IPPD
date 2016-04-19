// 'use strict';
//
// describe('Affiliation Karma Tests', function(){
//   beforeEach(module('admin'));
//
//   var $controller;
//
//   beforeEach(inject(function(_$controller_){
//     // The injector unwraps the underscores (_) from around the parameter names when matching
//     $controller = _$controller_;
//   }));
//
//   describe('$scope.find()', function(){
//     it('Does what I tell it to', function(){
//       var $scope = {};
//       var controller = $controller('AffiliationController', { $scope: $scope });
//     });
//   });
// });




// 'use strict';
//
// (function () {
//   // Authentication controller Spec
//   describe('AffiliationController', function () {
//     // Initialize global variables
//     var AffiliationController,
//       scope,
//       $resource,
//       $stateParams,
//       $state,
//       $location;
//
//     beforeEach(function () {
//       jasmine.addMatchers({
//         toEqualData: function (util, customEqualityTesters) {
//           return {
//             compare: function (actual, expected) {
//               return {
//                 pass: angular.equals(actual, expected)
//               };
//             }
//           };
//         }
//       });
//     });
//
//     // Load the main application module
//     beforeEach(module(ApplicationConfiguration.admin));
//
//     describe('Logged in Admin?', function () {
//       // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
//       // This allows us to inject a service but then attach it to a variable
//       // with the same name as the service.
//       //scope, state, stateparams, location, authenticaion, affiliations
//       beforeEach(inject(function ($controller, $rootScope, $state, _$stateParams_, _$location_, _Authentication_, _Affiliations_, _$resource_) {
//         // Set a new global scope
//        // scope = $rootScope.$new();
//
//       //  $location = _$location_;
//         $location.path = jasmine.createSpy().and.returnValue(true);
//         scope = $rootScope.$new();
//
//         // Point global variables to injected services
//         $stateParams = _$stateParams_;
//         $resource = _$resource_;
//         $location = _$location_;
//         _Authentication_.user = {
//           username: 'clientUnittest',
//           roles: ['user', 'admin']
//         };
//
//         // Initialize the Affiliation Controller
//         AffiliationController = $controller(AffiliationController, {
//           $scope: scope
//         });
//       }));
//
//       describe('$scope.create()', function(){
//         it('should save if form is valid and not duplicate entry', function(){
//           //TEST expect POST request
//           //scope.affiliationtoSave = 'unitClientAffiliation';
//           $resource.when('POST', '/api/affiliations').respond(200, 'unitClientAffiliation');
//           scope.create(true); //validity
//           $resource.flush();
//
//           //test scope value
//           //expect(scope.authentication.user).toBe('Fred');
//           expect(scope.error).toEqual(null);
//           expect($location.url()).toBe('/affiliations');
//         });
//
//         it('should fail if duplicate entry', function(){
//
//         });
//
//       });
//
//       describe('$scope.updateAffiliations()', function(){
//         it('should update?', function(){
//
//         });
//       });
//
//       describe('scope.update()', function(){
//
//       });
//
//       describe('scope.find()', function(){
//
//       });
//
//       describe('scope.findOne()', function(){
//
//       });
//
//  //commentGoeshere
//
//
//       });
//
//
//     });
//   });
// }());
//
