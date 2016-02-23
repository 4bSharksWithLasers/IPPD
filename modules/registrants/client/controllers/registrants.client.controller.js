'use strict';

// Registrants controller
angular.module('registrants').controller('RegistrantsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Registrants',
  function ($scope, $stateParams, $location, Authentication, Registrants) {
    $scope.authentication = Authentication;

    // Create new Registrant
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'registrantForm');

        return false;
      }

      // Create new Registrant object
      var registrant = new Registrants({
        email: this.email,
        affiliation: this.affiliation,
        teamName: this.teamName
      });

      // Redirect after save
      registrant.$save(function (response) {
        $location.path('/register');

        // Clear form fields
        $scope.email = '';
        $scope.affiliation = '';
        $scope.teamName = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Registrant
    $scope.remove = function (registrant) {
      if (registrant) {
        registrant.$remove();

        for (var i in $scope.registrants) {
          if ($scope.registrants[i] === registrant) {
            $scope.registrants.splice(i, 1);
          }
        }
      } else {
        $scope.registrant.$remove(function () {
          $location.path('registrants');
        });
      }
    };

    // Update existing Registrant
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'registrantForm');

        return false;
      }

      var registrant = $scope.registrant;

      registrant.$update(function () {
        $location.path('registrants/' + registrant._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Registrants
    $scope.find = function () {
      $scope.registrants = Registrants.query();
    };

    // Find existing Registrant
    $scope.findOne = function () {
      $scope.registrant = Registrants.get({
        registrantId: $stateParams.registrantId
      });
    };
  }
]);