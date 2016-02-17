/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */

/*var app = angular.module('registration', []);

app.controller('RegistrationController', function($scope, Users) {
	// list options for each dropdown
	$scope.affiliation = [
		{Choice:"Choose your affiliation..."},
		{Choice:"Student"},
		{Choice:"Coach"},
		{Choice:"Liason"},
		{Choice:"Other UF Affiliated"},
		{Choice:"Non-UF Affiliated"}
	];

	$scope.team = [
		{Choice:"Choose your team..."},
		{Choice:"Team 1"},
		{Choice:"Team 2"},
		{Choice:"Team 3"},
		{Choice:"Team 4"},
		{Choice:"Team 5"}
	];

	$scope.presentation = [
		{Choice:"Choose your presentation type..."},
		{Choice:"QRB"},
		{Choice:"SLDR"},
		{Choice:"Demo Day"}
	];

	$scope.createUser = function(isValid){
		$scope.error = null; 

		//check if the form is valid
		if(!isValid){
			$scope.$broadcast('show-errors-check-validity', 'articleForm');
			return false; 
		}

		//create the user object
		var user = {
			email: $scope.e-mail,
			teamName: $scope.teamChoice,
			affiliation: $scope.affiliationChoice
		}

		//save the article using User factory
		Users.create(user);

	}

});*/
var app = angular.module('registration', []);

var app = angular.module('registration').controller('RegistrationController', ['$scope', 'Users',
	function($scope, Users){

		$scope.affiliation = [
			{Choice:"Choose your affiliation..."},
			{Choice:"Student"},
			{Choice:"Coach"},
			{Choice:"Liason"},
			{Choice:"Other UF Affiliated"},
			{Choice:"Non-UF Affiliated"}
		];

	$scope.team = [
		{Choice:"Choose your team..."},
		{Choice:"Team 1"},
		{Choice:"Team 2"},
		{Choice:"Team 3"},
		{Choice:"Team 4"},
		{Choice:"Team 5"}
	];

	$scope.presentation = [
		{Choice:"Choose your presentation type..."},
		{Choice:"QRB"},
		{Choice:"SLDR"},
		{Choice:"Demo Day"}
	];

	$scope.createUser = function(isValid){
		$scope.error = null; 

		//check if the form is valid
		if(!isValid){
			$scope.$broadcast('show-errors-check-validity', 'articleForm');
			return false; 
		}

		//create the user object
		var user = {
			email: $scope.e-mail,
			teamName: $scope.teamChoice,
			affiliation: $scope.affiliationChoice
		}

		//save the article using User factory
		Users.create(user);

	};

}]);

/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */
