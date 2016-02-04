/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */

var app = angular.module('registration', []);

app.controller('RegistrationController', function($scope) {
  $scope.test = 'Hello world';
	
	var affiliation_choices = ["Choose your affiliation..."];
	$scope.affiliation = affiliation_choices;

	var team_choices = ["Choose your team..."];
	$scope.team = team_choices;

	var presentation_choices = ["Choose your presentation type..."];
	$scope.presentation = presentation_choices;
});

/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */
