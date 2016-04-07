'use strict';

// Team controller
angular.module('admin').controller('TeamController', ['$scope', '$stateParams', '$location', 'Authentication', 'Teams',
  function ($scope, $stateParams, $location, Authentication, Teams) {
    $scope.authentication = Authentication;
    //variables for success messages
    $scope.showTeamAdded = false; 
    $scope.showTeamDeleted = false;
    //variable to hold array of teams 
    $scope.teams = null;  


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
          $location.path('/teams');

          $scope.showTeamAdded = true;

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
          $scope.showTeamDeleted = true; 
          if($scope.splicing === false)
            $scope.updateTeams();
          //redirect path after deletion
          $location.path('/teams');
          
        }
      } else { 
        $scope.team.$remove(function () {
          $location.path('team');
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
          if($scope.teams[i].name === $scope.team.name){
            console.log('duplicate name encountered');
            confirm('A team already exists with this name. Please choose another presentation type.');
            return false; 
          }
        }
        team.$update(function () {
          $location.path('team/' + team._id);
          //redirect path after deletion
          $location.path('/teams');
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
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
