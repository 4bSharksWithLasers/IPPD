'use strict';

// Team controller
angular.module('admin').controller('TeamController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Teams',
  function ($scope, $state, $stateParams, $location, Authentication, Teams) {
    $scope.authentication = Authentication;
    //variable to hold array of teams
    $scope.teams = null;
    $scope.msg = true;

    // Create new Team
    $scope.create = function (isValid) {
      $scope.error = null;
      // save the form data, for use if the form is valid and if the entry is not a duplicate
      $scope.teamToSave = this.name;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'teamForm');

        return false;
      }
      // uses the find() function and then checks through to make sure no duplicate entries can be saved
      $scope.find();
      $scope.teams.$promise.then(function(data){
        console.log(data);
        console.log($scope.teams.length);
        for(var i=0; i < $scope.teams.length; i++){
          console.log($scope.teams[i].name);
          // if a duplicate team is found, present error message
          if($scope.teams[i].name === $scope.teamToSave){
            console.log('duplicate name encountered');
            confirm('A team already exists with this name. Please choose another name.');
            return false;
          }
        }
        // Create new team object if there is not a duplicate
        var team = new Teams({
          name: $scope.teamToSave
        });

        // Redirect after save
        team.$save(function (response) {
          $state.go('teams.list', { successMessage: 'Team successfully saved!' });

          // Clear form fields
          $scope.name = '';
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      });
    };

    // function to remove all teams. Must confirm via message before they are all deleted
    $scope.removeAll = function(){
      if(confirm('Press OK to confirm deletion.')){
        console.log($scope.teams.length);

        for(var i=0; i < $scope.teams.length; i++){
          console.log($scope.teams[i]);
          $scope.teams[i].$remove();
        }
        $scope.teams.splice(0, $scope.teams.length);
      }
    };

    // function that 'refreshes' the list fo teams for the admin panel, so the list is always updated after a team is removed/added
    $scope.updateTeams = function(){
      Teams.query(function(refreshedTeams){
        $scope.teams = refreshedTeams;
      });
    };

    // Remove existing team. must confirm via message
    $scope.remove = function (team) {
      $scope.splicing = false;
      if (team) {
        if(confirm('Press OK to confirm deletion.')){
          team.$remove();
          for (var i in $scope.teams) {
            console.log('in splice for loop');
            if ($scope.teams[i] === team) {
              console.log('splicing');
              $scope.splicing = true;
              $scope.teams.splice(i, 1);
            }
          }
          $scope.updateTeams();
          if($scope.splicing === false)
            $scope.updateTeams();
          //redirect path after deletion
          $state.go('teams.list', { successMessage: 'Team successfully deleted!' });
          $scope.msg = true;
        }
        else{
          return false;
        }
      } else {
        $scope.team.$remove(function () {
          $state.go('teams.list', { successMessage: 'Team successfully deleted!' });
          $scope.msg = true;
        });
      }
    };

    // Update existing team only if the name isn't a duplicate
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'teamForm');

        return false;
      }

      var team = $scope.team;

      $scope.find();
      $scope.teams.$promise.then(function(data){
        for(var i = 0; i < $scope.teams.length; i++){
          if($scope.teams[i].name === $scope.team.name && $scope.teams[i]._id !== $scope.team._id){
            console.log('duplicate name encountered');
            confirm('A team already exists with this name. Please choose another presentation type.');
            return false;
          }
        }
        team.$update(function () {
          $location.path('team/' + team._id);
          //redirect path after deletion
          $state.go('teams.list', { successMessage: 'Team successfully updated!' });
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      });

    };

     /* Bind the success message to the scope if it exists as part of the current state */
    if($stateParams.successMessage) {
      $scope.success = $stateParams.successMessage;
    }

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
