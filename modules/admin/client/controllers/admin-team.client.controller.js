'use strict';

// Team controller
angular.module('admin').controller('TeamController', ['$scope', '$stateParams', '$location', 'Authentication', 'Teams',
  function ($scope, $stateParams, $location, Authentication, Teams) {
    $scope.authentication = Authentication;

    // Create new Team
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'teamForm');
        
        return false;
      }

      // Create new team object
      var team = new Teams({
        name: this.name,
        code: this.code
      });

      // Redirect after save
      team.$save(function (response) {
        $location.path('/teams');

        // Clear form fields
        $scope.name = '';
        $scope.code = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing team
    $scope.remove = function (team) {

      if (team) {
        if(confirm('Press OK to confirm deletion.')){
          team.$remove();
          //redirect path after deletion
          $location.path('/teams');

          for (var i in $scope.teams) {
            if ($scope.teams[i] === team) {
              $scope.teams.splice(i, 1);
            }
          }
        }
      } else { 
        $scope.team.$remove(function () {
          $location.path('team');
        });
      }
    };

    // Update existing team
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'teamForm');

        return false;
      }

      var team = $scope.team;

      team.$update(function () {
        $location.path('team/' + team._id);
        //redirect path after deletion
        $location.path('/teams');
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of teams
    $scope.find = function () {
      $scope.teams = Teams.query();
    };

    // Find existing team
    $scope.findOne = function () {
      $scope.team = Teams.get({
        teamId: $stateParams.teamId
      });
    };
  }
]);
