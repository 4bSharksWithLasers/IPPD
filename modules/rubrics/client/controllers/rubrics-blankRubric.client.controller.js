'use strict';

// Registrants controller
angular.module('rubrics').controller('BlankRubricController', ['$scope', '$stateParams', '$location', 'Authentication', 'BlankRubrics',
  function ($scope, $stateParams, $location, Authentication, BlankRubrics) {
    $scope.authentication = Authentication;

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
        itemCategory: this.itemCategory,
        description1: this.description1,
        description2: this.description2,
        description3: this.description3
      });

      // Redirect after save
      blankRubric.$save(function (response) {
        $location.path('blankRubrics/' + response._id);

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
        blankRubric.$remove();

        for (var i in $scope.blankRubrics) {
          if ($scope.blankRubrics[i] === blankRubric) {
            $scope.blankRubrics.splice(i, 1);
          }
        }
      } else {
        $scope.blankRubric.$remove(function () {
          $location.path('blankRubrics');
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