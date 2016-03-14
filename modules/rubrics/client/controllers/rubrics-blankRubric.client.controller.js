'use strict';

// Registrants controller
angular.module('rubrics').controller('BlankRubricController', ['$scope', '$stateParams', '$location', 'Authentication', 'BlankRubrics',
  function ($scope, $stateParams, $location, Authentication, BlankRubrics) {
    $scope.authentication = Authentication;


    $scope.rubricItemsArray = [ { itemCategory:'', description1:'', description2:'', description3:'' } ];
    $scope.showRubricItem = false;
    $scope.editing = false; 

    var first = true;

    $scope.addRubricItem = function($index){
      if(first===false)
        $scope.rubricItemsArray.push({ itemCategory:$scope.itemCategory, description1:$scope.description1, description2:$scope.description2, description3:$scope.description3 });
      else{
        $scope.rubricItemsArray.splice($scope.rubricItemsArray[0], 1);
        $scope.rubricItemsArray.push({ itemCategory:$scope.itemCategory, description1:$scope.description1, description2:$scope.description2, description3:$scope.description3 });
        $scope.showRubricItem = true;
        first = false;
      }
      $scope.itemCategory = '';
      $scope.description1 = '';
      $scope.description2 = '';
      $scope.description3 = '';
    };

    $scope.rmvRubricItem = function(item){
      $scope.rubricItemsArray.splice($scope.rubricItemsArray.indexOf(item), 1);
      if($scope.rubricItemsArray.length===0){
        first = true;
      }
    };

    $scope.addRubricItemArray = function(rubricArray){
      console.log(rubricArray);
      if(first===false)
        rubricArray.push({ itemCategory:$scope.itemCategory, description1:$scope.description1, description2:$scope.description2, description3:$scope.description3 });
      else{
        rubricArray.push({ itemCategory:$scope.itemCategory, description1:$scope.description1, description2:$scope.description2, description3:$scope.description3 });
        $scope.showRubricItem = true;
        first = false;
      }
      $scope.itemCategory = '';
      $scope.description1 = '';
      $scope.description2 = '';
      $scope.description3 = '';
    };

    $scope.rmvRubricItemArray = function(item, rubricArray){
      console.log(item);
      console.log(rubricArray);
      rubricArray.splice(rubricArray.indexOf(item), 1);
      if(rubricArray.length===0){
        first = true;
      }
    };





    // Create new blankRubric
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'blankRubricForm');

        return false;
      }

      // Create new blankRubric object
      var blankRubric = new BlankRubrics({
        presentationType: this.presentationType,
        instructions: this.instructions,
        ratedItems: $scope.rubricItemsArray
      });

      // Redirect after save
      blankRubric.$save(function (response) {
        $location.path('/blankRubrics');

        // Clear form fields
        $scope.presentationType = '';
        $scope.instructions = '';
        $scope.description1 = '';
        $scope.description2 = '';
        $scope.description3 = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing blankRubric
    $scope.remove = function (blankRubric) {
      if (blankRubric) {
        if(confirm('Press OK to confirm deletion.')){
          blankRubric.$remove();
          $location.path('/blankRubrics');

          for (var i in $scope.blankRubrics) {
            if ($scope.blankRubrics[i] === blankRubric) {
              $scope.blankRubrics.splice(i, 1);
            }
          }
        }
      } else {
        $scope.blankRubric.$remove(function () {
          $location.path('/blankRubrics');
        });
      }
    };

    // Update existing blankRubric
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'blankRubricForm');

        return false;
      }

      var blankRubric = $scope.blankRubric;
      
      blankRubric.$update(function () {
        $location.path('blankRubrics/' + blankRubric._id);
        //redirect after update
        $location.path('/blankRubrics');
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of blankRubrics
    $scope.find = function () {
      $scope.blankRubrics = BlankRubrics.query();
      console.log($scope.blankRubrics);
    };

    // Find existing blankRubric
    $scope.findOne = function () {
      $scope.blankRubric = BlankRubrics.get({
        blankRubricId: $stateParams.blankRubricId
      });
      console.log('finding blankRubric');
    };
  }
]);
