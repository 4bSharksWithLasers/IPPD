'use strict';

// Registrants controller
angular.module('registrants').controller('RegistrantsController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Registrants', 'Teams', 'Affiliations',
  function ($scope, $state, $stateParams, $location, Authentication, Registrants, Teams, Affiliations) {
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
          //$location.path('/selectPresentation');
          $state.go('selectPresentation', { email: $scope.email, affiliation: $scope.affiliation.theAffiliation });

        // Clear form fields
          $scope.email = '';
          $scope.affiliation = '';
          $scope.teamName = '';
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
          //$location.path('/selectPresentation');
          $state.go('selectPresentation', { email: $scope.email, affiliation: $scope.affiliation.theAffiliation });

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

    $scope.removeAll = function(){
      if(confirm('Press OK to confirm deletion.')){
        console.log($scope.registrants.length);

        for(var i=0; i < $scope.registrants.length; i++){
          console.log($scope.registrants[i]);
          $scope.registrants[i].$remove();
        }
        $scope.registrants.splice(0, $scope.registrants.length);
      }
    };

    $scope.updateRegistrants = function(){
      Registrants.query(function(refreshedRegistrants){
        $scope.registrants = refreshedRegistrants;
      });
    };

    // Remove existing Registrant
    $scope.remove = function (registrant) {
      $scope.splicing = false;
      if (registrant) {
        if(confirm('Press OK to confirm deletion.')){
          registrant.$remove();
          for (var i in $scope.registrants) {
            if ($scope.registrants[i] === registrant) {
              $scope.registrants.splice(i, 1);
              $scope.splicing = true;
            }
          }
        }
        if($scope.splicing === false)
          $scope.updateRegistrants();
        //redirect path after deletion
        $location.path('/registrants');
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
  }
]);
