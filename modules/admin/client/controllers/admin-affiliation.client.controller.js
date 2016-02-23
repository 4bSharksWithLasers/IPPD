'use strict';

// Affiliation controller
angular.module('admin').controller('AffiliationController', ['$scope', '$stateParams', '$location', 'Authentication', 'Affiliations',
  function ($scope, $stateParams, $location, Authentication, Affiliations) {
    $scope.authentication = Authentication;

    // Create new Affiliation
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'affiliationForm');
        
        return false;
      }

      // Create new affiliation object
      var affiliation = new Affiliations({
        theAffiliation: this.affiliation
      });

      // Redirect after save
      affiliation.$save(function (response) {
        $location.path('/affiliations');

        // Clear form fields
        $scope.affiliation = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing affiliation
    $scope.remove = function (affiliation) {
      if (affiliation) {
        affiliation.$remove();

        for (var i in $scope.affiliation) {
          if ($scope.affiliation[i] === affiliation) {
            $scope.affiliation.splice(i, 1);
          }
        }
      } else {
        $scope.affiliation.$remove(function () {
          $location.path('affiliation');
        });
      }
    };

    // Update existing affiliation
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'affiliationForm');

        return false;
      }

      var affiliation = $scope.affiliation;

      affiliation.$update(function () {
        $location.path('affiliation/' + affiliation._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of affiliations
    $scope.find = function () {
      $scope.affiliation = Affiliations.query();
    };

    // Find existing affiliation
    $scope.findOne = function () {
      $scope.affiliation = Affiliations.get({
        affiliationId: $stateParams.affiliationId
      });
    };
  }
]);