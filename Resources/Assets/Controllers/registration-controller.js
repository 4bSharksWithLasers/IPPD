/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */

var app = angular.module('registration', []);

app.controller('RegistrationController', function($scope) {
	$scope.test = "x";
	console.log($scope.test);

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

});

/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */
