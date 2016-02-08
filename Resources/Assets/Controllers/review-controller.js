/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */

var app = angular.module('review', []);

app.controller('ReviewController', function($scope) {
	// review types and descriptions
	$scope.rubric = [
		{
			subject: "Design",
			star5: "Design spiel 5 star",
			star3: "Design spiel 3 star",
			star1: "Design spiel 1 star"
		},
		{
			subject: "Prototypes",
			star5: "Prototypes spiel 5 star",
			star3: "Prototypes spiel 3 star",
			star1: "Prototypes spiel 1 star"
		},
		{
			subject: "Project Goals",
			star5: "Goals spiel 5 star",
			star3: "Goals spiel 3 star",
			star1: "Goals spiel 1 star"
		},
		{
			subject: "Project Plans",
			star5: "Plans spiel 5 star",
			star3: "Plans spiel 3 star",
			star1: "Plans spiel 1 star"
		},
		{
			subject: "Project Risks",
			star5: "Risks spiel 5 star",
			star3: "Risks spiel 3 star",
			star1: "Risks spiel 1 star"
		},
		{
			subject: "Team Member Assignments",
			star5: "Team spiel 5 star",
			star3: "Team spiel 3 star",
			star1: "Team spiel 1 star"
		},
		{
			subject: "Liason Communication",
			star5: "Liason spiel 5 star",
			star3: "Liason spiel 3 star",
			star1: "Liason spiel 1 star"
		},
		{
			subject: "Overall Assessment",
			star5: "Assessment spiel 5 star",
			star3: "Assessment spiel 3 star",
			star1: "Assessment spiel 1 star"
		}
	];

	$scope.session = [
		{
			team: "Team Name",
			type: "Presentation Type"
		}
	];

	$scope.show = false;

// #ffd700 - gold
// #daa520 - goldenrod

	$scope.colorOne = "#eaeaea";
	$scope.colorTwo = "#eaeaea";
	$scope.colorThree = "#eaeaea";
	$scope.colorFour = "#eaeaea";
	$scope.colorFive = "#eaeaea";

	$scope.changeOne = function() {
		$scope.colorOne = "#ffd700";
		$scope.colorTwo = "#eaeaea";
		$scope.colorThree = "#eaeaea";
		$scope.colorFour = "#eaeaea";
		$scope.colorFive = "#eaeaea";
	};

	$scope.changeTwo = function() {
		$scope.colorOne = "#ffd700";
		$scope.colorTwo = "#ffd700";
		$scope.colorThree = "#eaeaea";
		$scope.colorFour = "#eaeaea";
		$scope.colorFive = "#eaeaea";
	};

	$scope.changeThree = function() {
		$scope.colorOne = "#ffd700";
		$scope.colorTwo = "#ffd700";
		$scope.colorThree = "#ffd700";
		$scope.colorFour = "#eaeaea";
		$scope.colorFive = "#eaeaea";
	};

	$scope.changeFour = function() {
		$scope.colorOne = "#ffd700";
		$scope.colorTwo = "#ffd700";
		$scope.colorThree = "#ffd700";
		$scope.colorFour = "#ffd700";
		$scope.colorFive = "#eaeaea";
	};

	$scope.changeFive = function() {
		$scope.colorOne = "#ffd700";
		$scope.colorTwo = "#ffd700";
		$scope.colorThree = "#ffd700";
		$scope.colorFour = "#ffd700";
		$scope.colorFive = "#ffd700";
	};
});

/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */
