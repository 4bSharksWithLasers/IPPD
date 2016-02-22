'use strict';

<<<<<<< HEAD
/*  ----------------------------------------------------------------------------
																					 Copyright 2016 4BSharksWithLasers    
----------------------------------------------------------------------------  */

var app = angular.module('registration', []);

app.controller('RegistrationController', function($scope) 
	// list options for each dropdown
	{ $scope.affiliation = [
		{ Choice:'Choose your affiliation...' },
		{ Choice:'Student' },
		{ Choice:'Coach' },
		{ Choice:'Liason' },
		{ Choice:'Other UF Affiliated' },
		{ Choice:'Non-UF Affiliated' }
	]; $scope.team = [
		{ Choice:'Choose your team...' },
		{ Choice:'Team 1' },
		{ Choice:'Team 2' },
		{ Choice:'Team 3' },
		{ Choice:'Team 4' },
		{ Choice:'Team 5' }
	]; $scope.presentation = [
		{ Choice:'Choose your presentation type...' },
		{ Choice:'QRB' },
		{ Choice:'SLDR' },
		{ Choice:'Demo Day' }
	]; $scope.isError = true; $scope.error = [
		{ type: 'Generic', 
			msg: 'Some nonsensical text used as a placeholder for the error message box'
		}
	]; $scope.closeError = function() 
	{ $scope.isError = false;
	};

});

/*  ----------------------------------------------------------------------------
																					 Copyright 2016 4BSharksWithLasers    
----------------------------------------------------------------------------  */
=======
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
>>>>>>> AmyRestructuringThatWorks
