/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */

var app = angular.module('review', []);

app.controller('ReviewController', function($scope) {
	// review types and descriptions
	$scope.rubric = {topics: [
		{Choice:"Choose your affiliation..."},
		{Choice:"Student"},
		{Choice:"Coach"},
		{Choice:"Liason"},
		{Choice:"Other UF Affiliated"},
		{Choice:"Non-UF Affiliated"}
	]};/*
	$scope.rubric = {topics: [
		{Choice:"Project Goals", 5Star:"5 star spiel x", 3Star:"3 star spiel", 1Star:"1 star spiel"},
		{Choice:"Prototype", 5Star:"5 star spiel y", 3Star:"3 star spiel", 1Star:"1 star spiel"},
		{Choice:"Project Plan", 5Star:"5 star spiel z", 3Star:"3 star spiel", 1Star:"1 star spiel"},
		{Choice:"Project Risks", 5Star:"5 star spiel a", 3Star:"3 star spiel", 1Star:"1 star spiel"},
		{Choice:"Other rubric fields", 5Star:"5 star spiel b", 3Star:"3 star spiel", 1Star:"1 star spiel"},
		{Choice:"Overall Assessment", 5Star:"5 star spiel c", 3Star:"3 star spiel", 1Star:"1 star spiel"}
	]};*/
});

/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */
