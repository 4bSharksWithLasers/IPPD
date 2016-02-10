/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */

var app = angular.module('review', []);

app.controller('ReviewController', function($scope) {

	$scope.session = [
		{
			team: "Team Name",
			type: "Presentation Type"
		}
	];

/*
	$scope.rubric = [
		{
			subject: "Design",
			five: "Well-conceived, achievable, and thoroughly documented design.",
			three: "Most system elements are defined, but some important elements missing.",
			one: "Major design flaws identified, design is too ambitious to be achieved, documentation weak.",
			colorOne: "#eaeaea",
			colorTwo: "#eaeaea",
			colorThree: "#eaeaea",
			colorFour: "#eaeaea",
			colorFive: "#eaeaea",
			rating: 0
		},
		{
			subject: "Prototypes",
			five: "A first prototype has already been developed and a final prototype is on track for fabrication and testing.",
			three: "Team will deliver a prototype and most of it will be tested against the product design specifications.",
			one: "Delivery of a functioning, partially tested prototype is doubtful.",
			colorOne: "#eaeaea",
			colorTwo: "#eaeaea",
			colorThree: "#eaeaea",
			colorFour: "#eaeaea",
			colorFive: "#eaeaea",
			rating: 0
		},
		{
			subject: "Project Goals",
			five: "Team can clearly communicate project goals and priorities.",
			three: "Project goals and priorities are available, but cannot be concisely shared.",
			one: "Project goals are unclear.",
			colorOne: "#eaeaea",
			colorTwo: "#eaeaea",
			colorThree: "#eaeaea",
			colorFour: "#eaeaea",
			colorFive: "#eaeaea",
			rating: 0
		},
		{
			subject: "Project Plans",
			five: "Project tasks are all defined, including dependencies, resources, schedule and risks; team updates the plan frequently.",
			three: "Project plan reflects the standard IPPD deliverables but few sub-tasks or dependencies are provided. Resources may not be assigned; plan is not kept up to date.",
			one: "Project plan is out of date, incomplete, and is of little use to the team.",
			colorOne: "#eaeaea",
			colorTwo: "#eaeaea",
			colorThree: "#eaeaea",
			colorFour: "#eaeaea",
			colorFive: "#eaeaea",
			rating: 0
		},
		{
			subject: "Project Risks",
			five: "Project risks have been described and prioritized based upon likelihood of occurrence and negative impact potential. Mitigation strategies have been developed and resources have been assigned.",
			three: "Most project risks have been identified and priorities are established. Mitigation has been mostly thought through and some resources have been assigned.",
			one: "Team has identified few risks and has not thought through priorities or mitigation strategies.",
			colorOne: "#eaeaea",
			colorTwo: "#eaeaea",
			colorThree: "#eaeaea",
			colorFour: "#eaeaea",
			colorFive: "#eaeaea",
			rating: 0
		},
		{
			subject: "Team Member Assignments",
			five: "Team members each have a clear role and the work load is balanced across the team.",
			three: "Team members have assigned roles and most are performing. Work load is moderately balanced.",
			one: "Team is loosely organized and only one or two members are carrying the load.",
			colorOne: "#eaeaea",
			colorTwo: "#eaeaea",
			colorThree: "#eaeaea",
			colorFour: "#eaeaea",
			colorFive: "#eaeaea",
			rating: 0
		},
		{
			subject: "Liason Communication",
			five: "Communication with liason occurs at least once a week. Liason reviews key documents.",
			three: "Liason communication occurs regularly and team receives some feedback.",
			one: "Infrequent communication. Liason is not aware of individual member contributions and is not engaged.",
			colorOne: "#eaeaea",
			colorTwo: "#eaeaea",
			colorThree: "#eaeaea",
			colorFour: "#eaeaea",
			colorFive: "#eaeaea",
			rating: 0
		},
		{
			subject: "Overall Assessment",
			five: "Team is on track and a successful project outcome that satisfies all of the customer's needs is highly likely.",
			three: "Project has manageable risks and a successful outcome is possible. Most of the customer's needs can be met.",
			one: "Project is headed for disaster and will fail without aggressive corrective action to mitigate major risks.",
			colorOne: "#eaeaea",
			colorTwo: "#eaeaea",
			colorThree: "#eaeaea",
			colorFour: "#eaeaea",
			colorFive: "#eaeaea",
			rating: 0
		}
	];
*/

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
			three: "Team members have assigned roles and most are performing. Work load is moderately balanced."
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

	$scope.star = [
		{
			colorOne: "#eaeaea",
			colorTwo: "#eaeaea",
			colorThree: "#eaeaea",
			colorFour: "#eaeaea",
			colorFive: "#eaeaea"
		},
		{
			colorOne: "#eaeaea",
			colorTwo: "#eaeaea",
			colorThree: "#eaeaea",
			colorFour: "#eaeaea",
			colorFive: "#eaeaea"
		},
		{
			colorOne: "#eaeaea",
			colorTwo: "#eaeaea",
			colorThree: "#eaeaea",
			colorFour: "#eaeaea",
			colorFive: "#eaeaea"
		},
		{
			colorOne: "#eaeaea",
			colorTwo: "#eaeaea",
			colorThree: "#eaeaea",
			colorFour: "#eaeaea",
			colorFive: "#eaeaea"
		},
		{
			colorOne: "#eaeaea",
			colorTwo: "#eaeaea",
			colorThree: "#eaeaea",
			colorFour: "#eaeaea",
			colorFive: "#eaeaea"
		},
		{
			colorOne: "#eaeaea",
			colorTwo: "#eaeaea",
			colorThree: "#eaeaea",
			colorFour: "#eaeaea",
			colorFive: "#eaeaea"
		},
		{
			colorOne: "#eaeaea",
			colorTwo: "#eaeaea",
			colorThree: "#eaeaea",
			colorFour: "#eaeaea",
			colorFive: "#eaeaea"
		},
		{
			colorOne: "#eaeaea",
			colorTwo: "#eaeaea",
			colorThree: "#eaeaea",
			colorFour: "#eaeaea",
			colorFive: "#eaeaea"
		}
	];

	$scope.rating = [
		{
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

	$scope.recommendations = [{text:"", urgent:0}];

	$scope.showDescription = false;
	$scope.showChecked = false;
	$scope.showMinus = false;
	$scope.showUrgent = false;

// #ffd700 - gold

/*
	$scope.changeOne = function(index) {
		$scope.rubric[index].colorOne = "#ffd700";
		$scope.rubric[index].colorTwo = "#eaeaea";
		$scope.rubric[index].colorThree = "#eaeaea";
		$scope.rubric[index].colorFour = "#eaeaea";
		$scope.rubric[index].colorFive = "#eaeaea";
		$scope.rubric[index].rating = 1;
	};

	$scope.changeTwo = function(index) {
		$scope.rubric[index].colorOne = "#ffd700";
		$scope.rubric[index].colorTwo = "#ffd700";
		$scope.rubric[index].colorThree = "#eaeaea";
		$scope.rubric[index].colorFour = "#eaeaea";
		$scope.rubric[index].colorFive = "#eaeaea";
		$scope.rubric[index].rating = 2;
	};

	$scope.changeThree = function(index) {
		$scope.rubric[index].colorOne = "#ffd700";
		$scope.rubric[index].colorTwo = "#ffd700";
		$scope.rubric[index].colorThree = "#ffd700";
		$scope.rubric[index].colorFour = "#eaeaea";
		$scope.rubric[index].colorFive = "#eaeaea";
		$scope.rubric[index].rating = 3;
	};

	$scope.changeFour = function(index) {
		$scope.rubric[index].colorOne = "#ffd700";
		$scope.rubric[index].colorTwo = "#ffd700";
		$scope.rubric[index].colorThree = "#ffd700";
		$scope.rubric[index].colorFour = "#ffd700";
		$scope.rubric[index].colorFive = "#eaeaea";
		$scope.rubric[index].rating = 4;
	};

	$scope.changeFive = function(index) {
		$scope.rubric[index].colorOne = "#ffd700";
		$scope.rubric[index].colorTwo = "#ffd700";
		$scope.rubric[index].colorThree = "#ffd700";
		$scope.rubric[index].colorFour = "#ffd700";
		$scope.rubric[index].colorFive = "#ffd700";
		$scope.rubric[index].rating = 5;
	};
*/

	$scope.changeOne = function(index) {
		$scope.star[index].colorOne = "#ffd700";
		$scope.star[index].colorTwo = "#eaeaea";
		$scope.star[index].colorThree = "#eaeaea";
		$scope.star[index].colorFour = "#eaeaea";
		$scope.star[index].colorFive = "#eaeaea";
		$scope.rating[index].rating = 1;
	};

	$scope.changeTwo = function(index) {
		$scope.star[index].colorOne = "#ffd700";
		$scope.star[index].colorTwo = "#ffd700";
		$scope.star[index].colorThree = "#eaeaea";
		$scope.star[index].colorFour = "#eaeaea";
		$scope.star[index].colorFive = "#eaeaea";
		$scope.rating[index].rating = 2;
	};

	$scope.changeThree = function(index) {
		$scope.star[index].colorOne = "#ffd700";
		$scope.star[index].colorTwo = "#ffd700";
		$scope.star[index].colorThree = "#ffd700";
		$scope.star[index].colorFour = "#eaeaea";
		$scope.star[index].colorFive = "#eaeaea";
		$scope.rating[index].rating = 3;
	};

	$scope.changeFour = function(index) {
		$scope.star[index].colorOne = "#ffd700";
		$scope.star[index].colorTwo = "#ffd700";
		$scope.star[index].colorThree = "#ffd700";
		$scope.star[index].colorFour = "#ffd700";
		$scope.star[index].colorFive = "#eaeaea";
		$scope.rating[index].rating = 4;
	};

	$scope.changeFive = function(index) {
		$scope.star[index].colorOne = "#ffd700";
		$scope.star[index].colorTwo = "#ffd700";
		$scope.star[index].colorThree = "#ffd700";
		$scope.star[index].colorFour = "#ffd700";
		$scope.star[index].colorFive = "#ffd700";
		$scope.rating[index].rating = 5;
	};
  $scope.addRecommendation = function () {
    $scope.recommendations.push({text:$scope.recommendationText, urgent:1});
    $scope.recommendationText = "";
		$scope.showMinus = true;
  };

	$scope.t = $scope.rubric.map(function(index) {
		return {
			data: $scope.rubric[index],
			star: $scope.star[index]
		}
	});
});

/*  ----------------------------------------------------------------------------

																					 Copyright 2016 4BSharksWithLasers    

----------------------------------------------------------------------------  */
