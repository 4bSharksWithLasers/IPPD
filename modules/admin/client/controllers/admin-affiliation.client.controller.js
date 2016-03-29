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

    $scope.updateAffiliations = function(){
      Affiliations.query(function(refreshedAffiliations){
        $scope.affiliations = refreshedAffiliations;
      });
    };

    // Remove existing affiliation
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
        if($scope.splicing === false)
          $scope.updateAffiliations();
        //redirect path after deletion
        $location.path('/affiliations');
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

      console.log(affiliation.theAffiliation);

      affiliation.$update(function () {
        $location.path('affiliation/' + affiliation._id);
        //redirect path after deletion
        $location.path('/affiliations');
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

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
