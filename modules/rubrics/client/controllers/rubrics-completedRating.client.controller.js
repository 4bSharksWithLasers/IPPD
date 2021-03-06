'use strict';

// CompletedRatings controller
angular.module('rubrics').controller('CompletedRatingController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'CompletedRatings', 'Teams', 'BlankRubrics',
  function ($scope, $state, $stateParams, $location, Authentication, CompletedRatings, Teams, BlankRubrics) {
    $scope.authentication = Authentication;

     // varaibles to forward information from registration page and selectPresentation page to review page, and back
    console.log('Team: ', $stateParams.team, 'Presentation: ', $stateParams.presentation, 'Email: ', $stateParams.email, 'PresID: ', $stateParams.theId);
    $scope.forwarded_team = $stateParams.team;
    $scope.forwarded_presentation = $stateParams.presentation;
    $scope.forwarded_email = $stateParams.email;
    $scope.forwarded_id = $stateParams.blankRubricId;

    //
    $scope.msg = true;

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

      if(this.issuesIdentified===undefined){
        console.log('no issues found');
        this.issuesIdentified = 'n/a';
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

      $scope.foundZero = 0; 
      console.log($scope.foundZero);
      console.log($scope.rateArr.length);
      for(var i = 0; i < $scope.rateArr.length; i++){
        if($scope.rateArr[i].rating===0){
          console.log('found a zero rating entry');
          $scope.foundZero = 1; 
        }          
      }
      if($scope.foundZero === 1 || $scope.rateArr.length === 0){
        if(confirm('A rating of zero has been entered. Please give a numerical rating from 1-5 stars.')){

        }
      }
      else{
        // Redirect after save
        completedRating.$save(function (response) {
          $state.go('selectPresentation', { presentation: $scope.forwarded_presentation, email: $scope.forwarded_email, theId: $scope.forwarded_id, successMessage: 'Review successfully saved!' });

          // Clear form fields
          $scope.issuesIdentified = '';
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      }


      
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

    //Export completedRatings to  CSV
    $scope.export = function () {
      console.log('exporting CSV');

      var data = $scope.completedRatings;
      console.log(data);
      var ReportTitle = 'Completed Ratings';
      var ShowLabel = true;

      $scope.JSONToCSVConvertor(data, ReportTitle, ShowLabel);
    };

    $scope.JSONToCSVConvertor = function(JSONData, ReportTitle, ShowLabel) {

      var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;

      var CSV ='';

      //Set title in first row or line

      CSV += ReportTitle + '\r\n\n';

      //This condition will generate the Label/Header
      if (ShowLabel) {
        var row = '';

        //This loop will extract the label from 1st index on array
        var labelcounter = 0;
        for (var index in arrData[0]) {
          if (labelcounter <= 10) {
            //Now convert each value to string and comma-seprated
            row += index + ',';
          }
          labelcounter++;
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
      }

      //1st loop is to extract each row
      for (var i = 0; i < arrData.length; i++){
        var r = '';

        //2nd loop will extract each column and convert it in string comma-seprated
        var dataCounter = 0;
        for (var j in arrData[i]) {
          if (dataCounter <= 10){
            console.log('arrData[' + i + '][' + j + '] = ' + arrData[i][j]);
            var tempData = '';
            var testforobject = '';
            testforobject += arrData[i][j][0];
            if (testforobject === '[object Object]') {
              //console.log('object = true');
              for (var k = 0; k < arrData[i][j].length; k++) {
                var tempDataCounter = 0;
                for (var m in arrData[i][j][k]) {
                  //console.log('arrData[' + i + '][' + j + '][' + k + '][' + m + '] = ' + arrData[i][j][k][m]);
                  if (tempDataCounter < 2) {
                    tempData += arrData[i][j][k][m];
                    if (tempDataCounter === 0){
                      tempData += ': ';
                    }
                    if (tempDataCounter === 1) {
                      tempData += '; ';
                    }
                    tempDataCounter++;
                  }
                }
              }
              //console.log('tempData = ' + tempData);
            } else {
              tempData = arrData[i][j];
            }
            console.log('tempData = ' + tempData);
            r += '"' + tempData + '",';

          }
          dataCounter++;
        }

        r.slice(0, r.length - 1);

        //add a line break after each row
        CSV += r + '\r\n';
      }

      if (CSV === '') {
        alert('Invalid data');
        return;
      }

      //Generate a file name
      var fileName = 'Completed_Ratings';
      //this will remove the blank-spaces from the title and replace it with an underscore
      fileName += fileName.replace(/ /g,'_');

      //Initialize file format you want csv or xls
      var uri = 'data:text/csv;charset=utf-8,' + window.escape(CSV);

      // Note: can use either>> window.open(uri);
      // but this will not work in some browsers
      // or you will not get the correct file extension

      //this trick will generate a temp <a /> tag
      var link = document.createElement('a');
      link.href = uri;

      //set the visibility to hidden so it will not effect the web-layout
      link.style = 'visibility:hidden';
      link.download = fileName + '.csv';

      //appen anchor tag and remove it after automatic click
      document.body.appendChild(link);
      //Comment out click to see console.logs
      link.click();
      document.body.removeChild(link);

    };
  }
]);