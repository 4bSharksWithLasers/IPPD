'use strict';

// Registrants controller
angular.module('registrants').controller('RegistrantsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Registrants', 'Teams', 'Affiliations',
  function ($scope, $stateParams, $location, Authentication, Registrants, Teams, Affiliations) {
    $scope.authentication = Authentication;

    //Pull the list of teams and affiliations from DB
    $scope.teamDropdowns = Teams.query();
    $scope.affiliationDropdowns = Affiliations.query();


    // Create new Registrant
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'registrantForm');

        return false;
      }

      //If there is a team associated with the registrant
      if(this.affiliation.teamAssociated === true){
        // Create new Registrant object
        var registrantTeam = new Registrants({
          email: this.email,
          affiliation: this.affiliation.theAffiliation,
          teamName: this.teamName.name
        });
        // Redirect after save
        registrantTeam.$save(function (response) {
          $location.path('/selectPresentation');

        // Clear form fields
          $scope.email = '';
          $scope.affiliation = '';
          $scope.teamName = '';
          $scope.teamCode = '';
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      }
      //if there is not a team associated with the registrant
      else{
        // Create new Registrant object
        var registrant = new Registrants({
          email: this.email,
          affiliation: this.affiliation.theAffiliation,
          teamName: ''
        });
        // Redirect after save
        registrant.$save(function (response) {
          $location.path('/selectPresentation');

        // Clear form fields
          $scope.email = '';
          $scope.affiliation = '';
          $scope.teamName = '';
          $scope.teamCode = '';
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      }
    };

    // Remove existing Registrant
    $scope.remove = function (registrant) {
      if (registrant) {
        registrant.$remove();
        //redirect path after deletion
        $location.path('/registrants');

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
        $location.path('/registrants');
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

    //Phillip

  //
  }
]);
