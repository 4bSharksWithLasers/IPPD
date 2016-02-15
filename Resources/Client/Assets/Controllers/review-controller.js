/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */

var app = angular.module('review', []);

app.controller('ReviewController', function($scope) {
	//
	$scope.session = [
		{
			team: "Team Name",
			type: "Presentation Type"
		}
	];

	$scope.rubric = [
		{
			subject: "Design",
			five: "Well-conceived, achievable, and thoroughly documented design.",
			three: "Most system elements are defined, but some important elements missing.",
			one: "Major design flaws identified, design is too ambitious to be achieved, documentation weak."
		},
		{
			subject: "Prototypes",
			five: "A first prototype has already been developed and a final prototype is on track for fabrication and testing.",
			three: "Team will deliver a prototype and most of it will be tested against the product design specifications.",
			one: "Delivery of a functioning, partially tested prototype is doubtful."
		},
		{
			subject: "Project Goals",
			five: "Team can clearly communicate project goals and priorities.",
			three: "Project goals and priorities are available, but cannot be concisely shared.",
			one: "Project goals are unclear."
		},
		{
			subject: "Project Plans",
			five: "Project tasks are all defined, including dependencies, resources, schedule and risks; team updates the plan frequently.",
			three: "Project plan reflects the standard IPPD deliverables but few sub-tasks or dependencies are provided. Resources may not be assigned; plan is not kept up to date.",
			one: "Project plan is out of date, incomplete, and is of little use to the team."
		},
		{
			subject: "Project Risks",
			five: "Project risks have been described and prioritized based upon likelihood of occurrence and negative impact potential. Mitigation strategies have been developed and resources have been assigned.",
			three: "Most project risks have been identified and priorities are established. Mitigation has been mostly thought through and some resources have been assigned.",
			one: "Team has identified few risks and has not thought through priorities or mitigation strategies."
		},
		{
			subject: "Team Member Assignments",
			five: "Team members each have a clear role and the work load is balanced across the team.",
			three: "Team members have assigned roles and most are performing. Work load is moderately balanced.",
			one: "Team is loosely organized and only one or two members are carrying the load."
		},
		{
			subject: "Liason Communication",
			five: "Communication with liason occurs at least once a week. Liason reviews key documents.",
			three: "Liason communication occurs regularly and team receives some feedback.",
			one: "Infrequent communication. Liason is not aware of individual member contributions and is not engaged."
		},
		{
			subject: "Overall Assessment",
			five: "Team is on track and a successful project outcome that satisfies all of the customer's needs is highly likely.",
			three: "Project has manageable risks and a successful outcome is possible. Most of the customer's needs can be met.",
			one: "Project is headed for disaster and will fail without aggressive corrective action to mitigate major risks."
		}
	];

	$scope.recommendations = [{text:"", urgent:0}];

	// Build star and rating arrays based on the length of the rubric array
	$scope.star = [];
	$scope.rating = [];
	for(var i = 0; i < $scope.rubric.length; i++) {
		$scope.star.push({colorOne: "#eaeaea", colorTwo: "#eaeaea", colorThree: "#eaeaea", colorFour: "#eaeaea", colorFive: "#eaeaea"});
		$scope.rating.push({rating: 0});
	};

	/*
		Combines three arrays into one array of tuples.
			example: a[0, 1, 2] and b[3, 4, 5] and c[6, 7, 8] become d[(0, 3, 6), (1, 4, 7), (2, 5, 8)]
	*/
	Array.prototype.zip = function(one, two) {
		return this.map(function(e, i) {
			return [e, one[i], two[i]];
		})
	};

	// combine rubric[] and rating[] and star into u[]
	$scope.u = $scope.rubric.zip($scope.rating, $scope.star);

/*
	$scope.rating = [
		{
			email: string,
			team: string,
			presentation: string,
			design: 0,
			prototype: 0,
			goals: 0,
			plan: 0,
			risk: 0,
			assignment: 0,
			communication: 0,
			overall: 0,
			issues: 0,
			comments: [
				{
					recommendation: "",
					urgent: 0
				}
			]
		}
	];
*/
/*
		{
			"team": "Team1",
			"presentationType": "QRB", 
			"email": "reviewer1@ufl.edu",
			"projectGoals": 5,
			"thePrototype": 3,
			"design": 4,
			"projectPlan": 4,
			"projectRisks": 5,
			"teamMemberAssignments": 4,
			"liaisonCommunication": 5,
			"overallAssessment": 4,
			"issuesIdentified": "Not enough detail",
			"recommendedActions":{
				"recommendation": "Do better",
				"urgency": true	
			}
*/
	$scope.submitRating = function() {
		
	};

	$scope.recommendations = [{text:"", urgent:0}];

	$scope.showDescription = false;
	$scope.showChecked = false;
	$scope.showRecommendation = false;

	// #ffd700 - gold

	// Functions to change star color based on star level chosen
	$scope.changeOne = function(index) {
		$scope.star[index].colorOne = "#ffd700";
		$scope.star[index].colorTwo = "#eaeaea";
		$scope.star[index].colorThree = "#eaeaea";
		$scope.star[index].colorFour = "#eaeaea";
		$scope.star[index].colorFive = "#eaeaea";
		$scope.rating[index].rating = 1;
		console.log($scope.u[index][0].subject);
		console.log($scope.u[index][1].rating);
	};

	$scope.changeTwo = function(index) {
		$scope.star[index].colorOne = "#ffd700";
		$scope.star[index].colorTwo = "#ffd700";
		$scope.star[index].colorThree = "#eaeaea";
		$scope.star[index].colorFour = "#eaeaea";
		$scope.star[index].colorFive = "#eaeaea";
		$scope.rating[index].rating = 2;
		console.log($scope.u[index][0].subject);
		console.log($scope.u[index][1].rating);
	};

	$scope.changeThree = function(index) {
		$scope.star[index].colorOne = "#ffd700";
		$scope.star[index].colorTwo = "#ffd700";
		$scope.star[index].colorThree = "#ffd700";
		$scope.star[index].colorFour = "#eaeaea";
		$scope.star[index].colorFive = "#eaeaea";
		$scope.rating[index].rating = 3;
		console.log($scope.u[index][0].subject);
		console.log($scope.u[index][1].rating);
	};

	$scope.changeFour = function(index) {
		$scope.star[index].colorOne = "#ffd700";
		$scope.star[index].colorTwo = "#ffd700";
		$scope.star[index].colorThree = "#ffd700";
		$scope.star[index].colorFour = "#ffd700";
		$scope.star[index].colorFive = "#eaeaea";
		$scope.rating[index].rating = 4;
		console.log($scope.u[index][0].subject);
		console.log($scope.u[index][1].rating);
	};

	$scope.changeFive = function(index) {
		$scope.star[index].colorOne = "#ffd700";
		$scope.star[index].colorTwo = "#ffd700";
		$scope.star[index].colorThree = "#ffd700";
		$scope.star[index].colorFour = "#ffd700";
		$scope.star[index].colorFive = "#ffd700";
		$scope.rating[index].rating = 5;
		console.log($scope.u[index][0].subject);
		console.log($scope.u[index][1].rating);
	};

	// Add recommendations in a ToDo list format
	var first = true;
  $scope.addRecommendation = function(index) {
		if(first===false)
			$scope.recommendations.push({text:$scope.recommendationText, urgent:0});
		else {
			$scope.recommendations.splice($scope.recommendations[0], 1);
			$scope.recommendations.push({text:$scope.recommendationText, urgent:0});
			$scope.showRecommendation = true;
			first = false;
		}
    $scope.recommendationText = "";
  };

	// Remove recommendations
	$scope.rmvRecommendation = function(index) {
		$scope.recommendations.splice($scope.recommendations[index], 1);
		if($scope.recommendations.length===0) {
			first = true;
			$scope.showChecked = false;
		}
	};

	// Set urgency
	$scope.setUrgent = function(index) {
		if($scope.recommendations[index].urgent===1) {
			$scope.recommendations[index].urgent = 0;
			$scope.showChecked = false;
		}
		else {
			$scope.recommendations[index].urgent = 1;
			$scope.showChecked = true;
		}
		console.log($scope.recommendations[index].text);
		console.log($scope.recommendations[index].urgent);
	};

});

/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */
