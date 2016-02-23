'use strict';

// CompletedRatings controller
angular.module('rubrics').controller('CompletedRatingController', ['$scope', '$stateParams', '$location', 'Authentication', 'CompletedRatings', 'Teams',
  function ($scope, $stateParams, $location, Authentication, CompletedRatings, Teams) {
    $scope.authentication = Authentication;

    $scope.teamDropdowns = Teams.query();

    //create empty array of objects
    /*For recommended actions: use ng-repeat and add abject to array each time
    ng-repeat = "item in ratedItems"
    set ng-model to item.description, and urgency to item.critical. This sets the field for the array of objects
    save in controller: ratedItems: $scope.ratedItems 

    for the rubricItems 
    ng-mode:ratings[$index]
    */
    $scope.ratedItems = [{}];

    // Create new CompletedRating
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'completedRatingForm');
        
        return false;
      }

      // Create new completedRating object
      var completedRating = new CompletedRatings({
        team: this.team.name,
        presentationType: this.presentationType,
        email: this.email,
        ratedItems: [{ rubricItem: this.rubricItem,
                    rating: this.rating }],
        issuesIdentified: this.issuesIdentified,
        recommendedActions: this.recommendedActions,
        urgency: this.urgency
      });

      // Redirect after save
      completedRating.$save(function (response) {
        $location.path('/review');

        // Clear form fields
        $scope.team = '';
        $scope.presentationType = '';
        $scope.email = '';
        $scope.rubricItem = '';
        $scope.rating = '';
        $scope.issuesIdentified = '';
        $scope.recommendedActions = '';
        $scope.urgency = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing completedRating
    $scope.remove = function (completedRating) {
      if (completedRating) {
        completedRating.$remove();

        for (var i in $scope.completedRatings) {
          if ($scope.completedRatings[i] === completedRating) {
            $scope.completedRatings.splice(i, 1);
          }
        }
      } else {
        $scope.completedRating.$remove(function () {
          $location.path('completedRatings');
        });
      }
    };

    // Update existing completedRating
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'completedRatingForm');

        return false;
      }

      var completedRating = $scope.completedRating;

      completedRating.$update(function () {
        $location.path('completedRatings/' + completedRating._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of completedRatings
    $scope.find = function () {
      $scope.completedRatings = CompletedRatings.query();
    };

    // Find existing completedRating
    $scope.findOne = function () {
      $scope.completedRating = CompletedRatings.get({
        completedRatingId: $stateParams.completedRatingId
      });
    };
  }
]);