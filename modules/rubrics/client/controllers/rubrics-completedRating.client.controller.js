'use strict';

// CompletedRatings controller
angular.module('rubrics').controller('CompletedRatingController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'CompletedRatings', 'Teams', 'BlankRubrics',
  function ($scope, $state, $stateParams, $location, Authentication, CompletedRatings, Teams, BlankRubrics) {
    $scope.authentication = Authentication;

    // varaibles to forward information from registration page and selectPresentation page to review page, and back
    console.log("Team: ", $stateParams.team, "Presentation: ", $stateParams.presentation, "Email: ", $stateParams.email, "PresID: ", $stateParams.theId);
    $scope.forwarded_team = $stateParams.team;
    $scope.forwarded_presentation = $stateParams.presentation;
    $scope.forwarded_email = $stateParams.email;
    $scope.forwarded_id = $stateParams.blankRubricId;

    // variable to indicate whether the review page is in 'preview' mode, meaning not in an editing state, the view before the review will be submitted
    $scope.previewRubricSubmission = false;

    // function that is used to set the selected presentation type
    $scope.selectPresentationType = function (isValid){
      $scope.error = null;

      if(!isValid){
        $scope.$broadcast('show-errors-check-validity', 'presentationSelectionForm');
        console.log('invalid teamSelection form');
        return false;
      }
      //save the presentation type and team name.
      $scope.selectedTeam = this.team.name;
      $scope.forwarded_id = $stateParams.theId;

      console.log('in selectPresentation ' + $scope.forwarded_presentation);

      if($scope.forwarded_presentation === null || $scope.forwarded_presentation === undefined) {
        $scope.selectedPresentationType = this.presentationType.presentationType;
        $state.go('review', { blankRubricId: $scope.presentationType._id, team: $scope.selectedTeam, presentation: $scope.selectedPresentationType, email: $scope.forwarded_email });
      }
      else {
        console.log($scope.forwarded_id);
        $scope.selectedPresentationType = $scope.forwarded_presentation;
        $state.go('review', { blankRubricId: $scope.forwarded_id, team: $scope.selectedTeam, presentation: $scope.forwarded_presentation, email: $scope.forwarded_email });
      }
    };

    $scope.teamDropdowns = Teams.query();
    $scope.blankRubrics = BlankRubrics.query();

    // variable that holds array of recommended actions
    $scope.recommendations = [ { recommendation:'', urgency:false } ];
    // variable used to hide the recommended action's normal display if it is being edited
    $scope.showRecommendation = false;
    // varialbe to track if the recommended actions are being edited
    $scope.editing = false;
    //variable to hold if there is an error when the recommended action is edited (if the field is made to be blank)
    $scope.recommendationError = false;

    // function that checks if an edited item's field is blank. Prevents submission of a blank field change
    $scope.editItemCheck = function($index){
      if($scope.recommendations[$index].recommendation === '' || $scope.recommendations[$index].recommendation === undefined){
        return true;
      }
      else{
        $scope.editing = false;
        return false;
      }
    };

    //Add recommendations in a ToDo list format
    var first = true;
    $scope.addRecommendation = function(index){
      if($scope.recommendationText === '' || $scope.recommendationText === undefined){
        $scope.recommendationError = true;
      }
      else{
        $scope.recommendationError = false;
        if(first===false)
          $scope.recommendations.push({ recommendation:$scope.recommendationText, urgency:false });
        else{
          $scope.recommendations.splice($scope.recommendations[0], 1);
          $scope.recommendations.push({ recommendation:$scope.recommendationText, urgency:false });
          $scope.showRecommendation = true;
          first = false;
        }
        $scope.recommendationText = '';
      }

    };

    //Remove recommendations
    $scope.rmvRecommendation = function(item){
      $scope.editing = false;
      $scope.recommendations.splice($scope.recommendations.indexOf(item), 1);
      if($scope.recommendations.length===0){
        first = true;
      }
    };

    // function to Set urgency using checkbox
    $scope.setUrgent = function(index){
      if($scope.recommendations[index].urgency===true){
        $scope.recommendations[index].urgency = false;
      }
      else{
        $scope.recommendations[index].urgency=true;
      }
    };

    // function to switch between previewing and completing the review
    $scope.togglePreviewSubmission = function(){
      $scope.previewRubricSubmission = !$scope.previewRubricSubmission;
    };

    // Build star and rating arrays based on the length of the rubric array
    $scope.star = [];
    $scope.rating = [];
    $scope.rubricItems = [];
    // variable that tracks whether the description should be showing
    $scope.showDescription = false;

    // function that initializes each array, to populate the requested rubric with the corresponding data from the database
    $scope.initializeArrays = function (index){
      if(!angular.isUndefined(index)){
        $scope.star[index] = ({ colorOne: '#eaeaea', colorTwo: '#eaeaea', colorThree: '#eaeaea', colorFour: '#eaeaea', colorFive: '#eaeaea' });
        $scope.rating[index] = (0);
        $scope.rubricItems[index] = ('');
      }
    };

    // function that creates a combined array of rubricItems and ratings
    $scope.ratedArray = function(){
      var zippedArray = [];
      for(var i = 0; i < $scope.rubricItems.length; i++){
        zippedArray.push({ rubricItem:$scope.rubricItems[i], rating:$scope.rating[i] });
      }
      return zippedArray;
    };

    // variable to hold the combined array of rubric items and ratings
    $scope.rateArr = $scope.ratedArray();

  // Functions to change star color based on star level chosen (1-5)
    $scope.changeOne = function(index, item) {
      $scope.star[index].colorOne = '#ffd700';
      $scope.star[index].colorTwo = '#eaeaea';
      $scope.star[index].colorThree = '#eaeaea';
      $scope.star[index].colorFour = '#eaeaea';
      $scope.star[index].colorFive = '#eaeaea';
      $scope.rubricItems[index] = item;
      $scope.rating[index] = 1;
      $scope.rateArr = $scope.ratedArray();
    };

    $scope.changeTwo = function(index, item) {
      $scope.star[index].colorOne = '#ffd700';
      $scope.star[index].colorTwo = '#ffd700';
      $scope.star[index].colorThree = '#eaeaea';
      $scope.star[index].colorFour = '#eaeaea';
      $scope.star[index].colorFive = '#eaeaea';
      $scope.rubricItems[index] = item;
      $scope.rating[index] = 2;
      $scope.rateArr = $scope.ratedArray();
    };

    $scope.changeThree = function(index, item) {
      $scope.star[index].colorOne = '#ffd700';
      $scope.star[index].colorTwo = '#ffd700';
      $scope.star[index].colorThree = '#ffd700';
      $scope.star[index].colorFour = '#eaeaea';
      $scope.star[index].colorFive = '#eaeaea';
      $scope.rubricItems[index] = item;
      $scope.rating[index] = 3;
      $scope.rateArr = $scope.ratedArray();
    };

    $scope.changeFour = function(index, item) {
      $scope.star[index].colorOne = '#ffd700';
      $scope.star[index].colorTwo = '#ffd700';
      $scope.star[index].colorThree = '#ffd700';
      $scope.star[index].colorFour = '#ffd700';
      $scope.star[index].colorFive = '#eaeaea';
      $scope.rubricItems[index] = item;
      $scope.rating[index] = 4;
      $scope.rateArr = $scope.ratedArray();
    };

    $scope.changeFive = function(index, item) {
      $scope.star[index].colorOne = '#ffd700';
      $scope.star[index].colorTwo = '#ffd700';
      $scope.star[index].colorThree = '#ffd700';
      $scope.star[index].colorFour = '#ffd700';
      $scope.star[index].colorFive = '#ffd700';
      $scope.rubricItems[index] = item;
      $scope.rating[index] = 5;
      $scope.rateArr = $scope.ratedArray();
    };

    // Create new CompletedRating if the form is valid
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'completedRatingForm');

        return false;
      }

      // Create new completedRating object
      var completedRating = new CompletedRatings({
        team: $scope.forwarded_team,
        presentationType:  $scope.forwarded_presentation,
        email: $scope.forwarded_email,
        ratedItems: $scope.rateArr,
        issuesIdentified: this.issuesIdentified,
        recommendedActions: $scope.recommendations
      });


      // Redirect after save
      completedRating.$save(function (response) {
        $state.go('selectPresentation', { presentation: $scope.forwarded_presentation, email: $scope.forwarded_email, theId: $scope.forwarded_id, successMessage: 'Review successfully saved!' });

        // Clear form fields
        $scope.issuesIdentified = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    /* Bind the success message to the scope if it exists as part of the current state */
    if($stateParams.successMessage) {
      $scope.success = $stateParams.successMessage;
    }

    // Remove existing completedRating
    $scope.remove = function (completedRating) {
      if (completedRating) {
        completedRating.$remove();

        for (var i in $scope.completedRatings) {
          if ($scope.completedRatings[i] === completedRating) {
            $scope.completedRatings.splice(i, 1);
          }
        }
      } else {
        $scope.completedRating.$remove(function () {
          $location.path('completedRatings');
        });
      }
    };

    // Update existing completedRating
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'completedRatingForm');

        return false;
      }

      var completedRating = $scope.completedRating;

      completedRating.$update(function () {
        $location.path('completedRatings/' + completedRating._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of completedRatings
    $scope.find = function () {
      $scope.completedRatings = CompletedRatings.query();
    };

    // function that returns the specified blankRubric
    $scope.findOneBlankRubric = function (){
      $scope.blankRubric = BlankRubrics.get({
        blankRubricId: $stateParams.blankRubricId
      });
    };

    // Find existing completedRating
    $scope.findOne = function () {
      $scope.completedRating = CompletedRatings.get({
        completedRatingId: $stateParams.completedRatingId
      });
    };

     /* Bind the success message to the scope if it exists as part of the current state */
    if($stateParams.successMessage) {
      $scope.success = $stateParams.successMessage;
      // console.log($scope.success);
    }

  }
]);
