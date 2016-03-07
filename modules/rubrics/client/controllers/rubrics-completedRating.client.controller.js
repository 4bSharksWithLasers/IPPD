'use strict';

// CompletedRatings controller
angular.module('rubrics').controller('CompletedRatingController', ['$scope', '$stateParams', '$location', 'Authentication', 'CompletedRatings', 'Teams', 'BlankRubrics',
  function ($scope, $stateParams, $location, Authentication, CompletedRatings, Teams, BlankRubrics) {
    $scope.authentication = Authentication;


    $scope.selectPresentationType = function (isValid){
      $scope.error = null;

      if(!isValid){
        $scope.$broadcast('show-errors-check-validity', 'presentationSelectionForm');

        return false;
      }
      //save the presentation type and team name. 
      $scope.selectedTeam = this.team.name;
      $scope.selectedPresentationType = this.presentationType.presentationType;

      console.log($scope.selectedTeam + ' ' + $scope.selectedPresentationType);

      // Redirect after submission of form
      //$location.path('/:blankRubricId');
    };

    $scope.teamDropdowns = Teams.query();
    $scope.blankRubrics = BlankRubrics.query();

    //array to hold recommended actions
    $scope.recommendations = [ { recommendation:'', urgency:false } ];
    $scope.showChecked = false; 
    $scope.showRecommendation = false; 

    //Add recommendations in a ToDo list format
    var first = true; 
    $scope.addRecommendation = function(index){
      if(first===false)
        $scope.recommendations.push({ recommendation:$scope.recommendationText, urgency:false });
      else{
        $scope.recommendations.splice($scope.recommendations[0], 1);
        $scope.recommendations.push({ recommendation:$scope.recommendationText, urgency:false });
        $scope.showRecommendation = true;
        first = false; 
      }
      $scope.recommendationText = '';
    };

    //Remove recommendations
    $scope.rmvRecommendation = function(index){ 
      $scope.recommendations.splice($scope.recommendations[index], 1);
      if($scope.recommendations.length===0){
        first = true;
        $scope.showChecked = false;
      }
    };

    //Set urgency
    $scope.setUrgent = function(index){
      if($scope.recommendations[index].urgency===true){
        $scope.recommendations[index].urgency = false;
        $scope.showChecked = false;
      }
      else{
        $scope.recommendations[index].urgency=true; 
        $scope.showChecked = true;
      }
      console.log($scope.recommendations[index].recommendation);
      console.log($scope.recommendations[index].urgency);
    };

    
    


    // Build star and rating arrays based on the length of the rubric array
    $scope.star = [];
    $scope.rating = [];
    $scope.rubricItems = [];
    $scope.showDescription = false; 
    $scope.ratedItems = [];
    
    $scope.initializeArrays = function (index){
      console.log('index is: ' + index);
      if(!angular.isUndefined(index)){
        $scope.star[index] = ({ colorOne: '#eaeaea', colorTwo: '#eaeaea', colorThree: '#eaeaea', colorFour: '#eaeaea', colorFive: '#eaeaea' });
        $scope.rating[index] = (0);
        $scope.rubricItems[index] = ('');
        console.log('initializing arrays');
      }
    };
    console.log('star' + $scope.star);
    console.log('rating' + $scope.rating);

    /*
    Combines two arrays into one array .
      example: a[0, 1, 2] and b[3, 4, 5] become d[(0, 3), (1, 4), (2, 5)]
    */
    Array.prototype.zip = function(one) {
      return this.map(function(e, i) {
        return [e, one[i]];
      });
    };

    $scope.ratedArray = function(){
      var zippedArray = [];
      for(var i = 0; i < $scope.rubricItems.length; i++){
        zippedArray.push({ rubricItem:$scope.rubricItems[i], rating:$scope.rating[i] });
      }
      return zippedArray;
    };

    $scope.rateArr = $scope.ratedArray();

  // Functions to change star color based on star level chosen
    $scope.changeOne = function(index, item) {
      $scope.star[index].colorOne = '#ffd700';
      $scope.star[index].colorTwo = '#eaeaea';
      $scope.star[index].colorThree = '#eaeaea';
      $scope.star[index].colorFour = '#eaeaea';
      $scope.star[index].colorFive = '#eaeaea';
      console.log('changeOne ' + index + ' itemCategory ' + item);
      $scope.rubricItems[index] = item;
      $scope.rating[index] = 1;
      $scope.rateArr = $scope.ratedArray();
      console.log('rubricItems array: ' + $scope.rubricItems[index]);
      console.log('rubricItems actual array ' + $scope.rubricItems);
      console.log('ratings array: ' + $scope.rating[index]);
      console.log('ratings actual array: ' + $scope.rating);
      console.log('ratedItems item: ' + $scope.rateArr[index].rubricItem);
      console.log('ratedItems rating: ' + $scope.rateArr[index].rating);
    };

    $scope.changeTwo = function(index, item) {
      $scope.star[index].colorOne = '#ffd700';
      $scope.star[index].colorTwo = '#ffd700';
      $scope.star[index].colorThree = '#eaeaea';
      $scope.star[index].colorFour = '#eaeaea';
      $scope.star[index].colorFive = '#eaeaea';
      console.log('changeTwo ' + index + ' itemCategory ' + item);
      $scope.rubricItems[index] = item;
      $scope.rating[index] = 2;
      $scope.rateArr = $scope.ratedArray();
      console.log('rubricItems array: ' + $scope.rubricItems[index]);
      console.log('rubricItems actual array ' + $scope.rubricItems);
      console.log('ratings array: ' + $scope.rating[index]);
      console.log('ratings actual array: ' + $scope.rating);
      console.log('ratedItems item: ' + $scope.rateArr[index].rubricItem);
      console.log('ratedItems rating: ' + $scope.rateArr[index].rating);
    };

    $scope.changeThree = function(index, item) {
      $scope.star[index].colorOne = '#ffd700';
      $scope.star[index].colorTwo = '#ffd700';
      $scope.star[index].colorThree = '#ffd700';
      $scope.star[index].colorFour = '#eaeaea';
      $scope.star[index].colorFive = '#eaeaea';
      console.log('changeThree ' + index + ' itemCategory ' + item);
      $scope.rubricItems[index] = item;
      $scope.rating[index] = 3;
      $scope.rateArr = $scope.ratedArray();
      console.log('rubricItems array: ' + $scope.rubricItems[index]);
      console.log('rubricItems actual array ' + $scope.rubricItems);
      console.log('ratings array: ' + $scope.rating[index]);
      console.log('ratings actual array: ' + $scope.rating);
      console.log('ratedItems item: ' + $scope.rateArr[index].rubricItem);
      console.log('ratedItems rating: ' + $scope.rateArr[index].rating);
    };

    $scope.changeFour = function(index, item) {
      $scope.star[index].colorOne = '#ffd700';
      $scope.star[index].colorTwo = '#ffd700';
      $scope.star[index].colorThree = '#ffd700';
      $scope.star[index].colorFour = '#ffd700';
      $scope.star[index].colorFive = '#eaeaea';
      console.log('changeFour ' + index + ' itemCategory ' + item);
      $scope.rubricItems[index] = item;
      $scope.rating[index] = 4;
      $scope.rateArr = $scope.ratedArray();
      console.log('rubricItems array: ' + $scope.rubricItems[index]);
      console.log('rubricItems actual array ' + $scope.rubricItems);
      console.log('ratings array: ' + $scope.rating[index]);
      console.log('ratings actual array: ' + $scope.rating);
      console.log('ratedItems item: ' + $scope.rateArr[index].rubricItem);
      console.log('ratedItems rating: ' + $scope.rateArr[index].rating);
    };

    $scope.changeFive = function(index, item) {
      $scope.star[index].colorOne = '#ffd700';
      $scope.star[index].colorTwo = '#ffd700';
      $scope.star[index].colorThree = '#ffd700';
      $scope.star[index].colorFour = '#ffd700';
      $scope.star[index].colorFive = '#ffd700';
      console.log('changeFive ' + index + ' itemCategory ' + item);
      $scope.rubricItems[index] = item;
      $scope.rating[index] = 5;
      $scope.rateArr = $scope.ratedArray();
      console.log('rubricItems array: ' + $scope.rubricItems[index]);
      console.log('rubricItems actual array ' + $scope.rubricItems);
      console.log('ratings array: ' + $scope.rating[index]);
      console.log('ratings actual array: ' + $scope.rating);
      console.log('ratedItems item: ' + $scope.rateArr[index].rubricItem);
      console.log('ratedItems rating: ' + $scope.rateArr[index].rating);
    };




    // Create new CompletedRating
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'completedRatingForm');
        
        return false;
      }

      console.log('team: ' + this.team.name);
      console.log('presentationType: ' + this.presentationType.presentationType);
      console.log('email: ' + this.email);
      console.log('rubricItem: ' + this.rubricItem);
      console.log('rating: ' + this.rating);

      // Create new completedRating object
      var completedRating = new CompletedRatings({
        team: this.team.name,
        presentationType:  this.presentationType.presentationType,
        email: this.email,
        ratedItems: $scope.rateArr,
        issuesIdentified: this.issuesIdentified,
        recommendedActions: $scope.recommendations
      });

      // Redirect after save
      completedRating.$save(function (response) {
        $location.path('/selectPresentation');

        // Clear form fields
        $scope.team = '';
        $scope.presentationType = '';
        $scope.email = '';
        $scope.rubricItem = '';
        $scope.rating = '';
        $scope.issuesIdentified = '';
        $scope.recommendedActions = '';
        $scope.urgency = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

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

    $scope.findOneBlankRubric = function (){
      $scope.blankRubric = BlankRubrics.get({
        blankRubricId: $stateParams.blankRubricId
      });
      $scope.blankRubric2 = $scope.blankRubric;
      console.log($scope.blankRubric);
    };

    // Find existing completedRating
    $scope.findOne = function () {
      $scope.completedRating = CompletedRatings.get({
        completedRatingId: $stateParams.completedRatingId
      });
    };
  }
]);