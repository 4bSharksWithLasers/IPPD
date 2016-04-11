'use strict';

// Affiliation controller
angular.module('admin').controller('AffiliationController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Affiliations',
  function ($scope, $state, $stateParams, $location, Authentication, Affiliations) {
    $scope.authentication = Authentication;
    // variable to store array of affiliations
    $scope.affiliations = null;

    // Create new Affiliation. only creates a new one if the form is valid and if it is not a duplicate entry
    $scope.create = function (isValid) {
      $scope.error = null;
      // saves the information from the from
      $scope.affiliationToSave = this.affiliation;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'affiliationForm');

        return false;
      }
      // uses the find() function to grab list of affiliations, to check if duplicate
      $scope.find();
      $scope.affiliations.$promise.then(function(data){
        console.log(data);
        console.log($scope.affiliations.length);
        for(var i=0; i < $scope.affiliations.length; i++){
          console.log($scope.affiliations[i].theAffiliation);
          // if the affiliation is a duplicate entry, present message and do not save
          if($scope.affiliations[i].theAffiliation === $scope.affiliationToSave){
            console.log('duplicate name encountered');
            confirm('An affiliation already exists with this name. Please choose another name.');
            return false;
          }
        }
        // Create new affiliation object if not a duplicate
        var affiliation = new Affiliations({
          theAffiliation: $scope.affiliationToSave
        });

        // Redirect after save
        affiliation.$save(function (response) {
          $state.go('affiliations.list', { successMessage: 'Affiliation successfully saved!' });

          // Clear form fields
          $scope.affiliation = '';
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      });
    };

    //function to 'refresh' list of affiliations for admin panel, so it's always updated when one is deleted/added
    $scope.updateAffiliations = function(){
      Affiliations.query(function(refreshedAffiliations){
        $scope.affiliations = refreshedAffiliations;
      });
    };

    // Remove existing affiliation after user confirms the action
    $scope.remove = function (affiliation) {
      $scope.splicing = false;
      if (affiliation) {
        if(confirm('Press OK to confirm deletion.')){
          affiliation.$remove();
          for (var i in $scope.affiliations) {
            if ($scope.affiliations[i] === affiliation) {
              $scope.affiliations.splice(i, 1);
              $scope.splicing = true;
            }
          }
        }
        else{
          return false;
        }
        if($scope.splicing === false)
          $scope.updateAffiliations();
        //redirect path after deletion
        $state.go('affiliations.list', { successMessage: 'Affiliation successfully deleted!' });
      } else {
        $scope.affiliation.$remove(function () {
          $state.go('affiliations.list', { successMessage: 'Affiliation successfully deleted!' });
        });
      }
    };

    // Update existing affiliation only if the name isn't a duplicate
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'affiliationForm');

        return false;
      }

      var affiliation = $scope.affiliation;

      console.log(affiliation.theAffiliation);

      $scope.find();
      $scope.affiliations.$promise.then(function(data){
        for(var i = 0; i < $scope.affiliations.length; i++){
          if($scope.affiliations[i].theAffiliation === $scope.affiliation.theAffiliation && $scope.affiliations[i]._id !== $scope.affiliation._id){
            console.log('duplicate name encountered');
            confirm('An affiliation already exists with this name. Please choose another presentation type.');
            return false;
          }
        }
        affiliation.$update(function () {
          $location.path('affiliation/' + affiliation._id);
          //redirect path after deletion
          $state.go('affiliations.list', { successMessage: 'Affiliation successfully updated!' });
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      });

    };

     /* Bind the success message to the scope if it exists as part of the current state */
    if($stateParams.successMessage) {
      $scope.success = $stateParams.successMessage;
    }

    // Find a list of affiliations
    $scope.find = function () {
      $scope.affiliations = Affiliations.query();
    };

    // Find existing affiliation
    $scope.findOne = function () {
      $scope.affiliation = Affiliations.get({
        affiliationId: $stateParams.affiliationId
      });
    };
  }
]);
