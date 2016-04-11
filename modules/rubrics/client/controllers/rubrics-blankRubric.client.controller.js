'use strict';

// BlankRubric controller
angular.module('rubrics').controller('BlankRubricController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'BlankRubrics',
  function ($scope, $state, $stateParams, $location, Authentication, BlankRubrics) {
    $scope.authentication = Authentication;

    // array to store user input for rubric items and their descriptions
    $scope.rubricItemsArray = [ { itemCategory:'', description1:'', description2:'', description3:'' } ];
    // variable used to show the rubric items that have been added to the rubric
    $scope.showRubricItem = false;
    // variable to track if a specific rubric item is being edited
    $scope.editing = false;
    // variable to track if there is an error with the entered rubric item (if the user deletes all text)
    $scope.rubricItemError = false;
    // varaible to indicate whether the first rubric item has been added
    var first = true;

    $scope.msg = true;

    // function (for addBlankRubric view) to make sure that it a rubric item is edited, the user cannot submit a blank field to crash the app.
    // if the field is blank, the check button to submit changes is disabled
    $scope.editItemCheck = function($index){
      if($scope.rubricItemsArray[$index].itemCategory === '' || $scope.rubricItemsArray[$index].description1 === '' || $scope.rubricItemsArray[$index].description2 === '' || $scope.rubricItemsArray[$index].description3 === '' || $scope.rubricItemsArray[$index].itemCategory === undefined || $scope.rubricItemsArray[$index].description1 === undefined || $scope.rubricItemsArray[$index].description2 === undefined || $scope.rubricItemsArray[$index].description3 === undefined){
        return true;
      }
      else{
        $scope.editing = false;
        return false;
      }
    };

    // function (for editBlankRubric view) to make sure that it a rubric item is edited, the user cannot submit a blank field to crash the app.
    // if the field is blank, the check button to submit changes is disabled
    $scope.editItemCheckArray = function(item, rubricArray){
      if(rubricArray[rubricArray.indexOf(item)].itemCategory === '' || rubricArray[rubricArray.indexOf(item)].description1 === '' || rubricArray[rubricArray.indexOf(item)].description2 === '' || rubricArray[rubricArray.indexOf(item)].description3 === '' || rubricArray[rubricArray.indexOf(item)].itemCategory === undefined || rubricArray[rubricArray.indexOf(item)].description1 === undefined || rubricArray[rubricArray.indexOf(item)].description2 === undefined || rubricArray[rubricArray.indexOf(item)].description3 === undefined){
        return true;
      }
      else{
        $scope.editing = false;
        return false;
      }
    };

    // function to add a rubric item (for addBlankRubric view)
    $scope.addRubricItem = function(){
      // prevents a blank field from being entered
      if($scope.itemCategory === '' || $scope.description1 === '' || $scope.description2 === '' || $scope.description3 === '' || $scope.itemCategory === undefined || $scope.description1 === undefined || $scope.description2 === undefined || $scope.description3 === undefined){
        console.log('invalid item category');
        $scope.rubricItemError = true;
      }
      else{
        $scope.rubricItemError = false;
        if(first===false){
          $scope.rubricItemsArray.push({ itemCategory:$scope.itemCategory, description1:$scope.description1, description2:$scope.description2, description3:$scope.description3 });
        }
        else{
          $scope.rubricItemsArray.splice($scope.rubricItemsArray[0], 1);
          $scope.rubricItemsArray.push({ itemCategory:$scope.itemCategory, description1:$scope.description1, description2:$scope.description2, description3:$scope.description3 });
          $scope.showRubricItem = true;
          first = false;
        }
        $scope.itemCategory = '';
        $scope.description1 = '';
        $scope.description2 = '';
        $scope.description3 = '';
      }

    };

    // function to remove a rubric item from the array (for addBlankRubric view)
    $scope.rmvRubricItem = function(item){
      $scope.rubricItemsArray.splice($scope.rubricItemsArray.indexOf(item), 1);
      if($scope.rubricItemsArray.length===0){
        first = true;
      }
    };

    // function to add a rubric item (for editBlankRubric view)
    $scope.addRubricItemArray = function(rubricArray){
      // prevents a blank field from being entered
      if($scope.itemCategory === '' || $scope.description1 === '' || $scope.description2 === '' || $scope.description3 === '' || $scope.itemCategory === undefined || $scope.description1 === undefined || $scope.description2 === undefined || $scope.description3 === undefined){
        console.log('invalid item category');
        $scope.rubricItemError = true;
      }
      else{
        $scope.rubricItemError = false;
        if(first===false){
          rubricArray.push({ itemCategory:$scope.itemCategory, description1:$scope.description1, description2:$scope.description2, description3:$scope.description3 });
        }
        else{
          rubricArray.push({ itemCategory:$scope.itemCategory, description1:$scope.description1, description2:$scope.description2, description3:$scope.description3 });
          $scope.showRubricItem = true;
          first = false;
        }
        $scope.itemCategory = '';
        $scope.description1 = '';
        $scope.description2 = '';
        $scope.description3 = '';
      }

    };

    // function to remove a rubric item from the array (for editBlankRubric view)
    $scope.rmvRubricItemArray = function(item, rubricArray){
      console.log(item);
      console.log(rubricArray);
      rubricArray.splice(rubricArray.indexOf(item), 1);
      if(rubricArray.length===0){
        first = true;
      }
    };

    // varaible to store array of blankRubrics
    $scope.blankRubrics = null;

    // Create new blankRubric if form data is valid and if the name is not a duplicate
    $scope.create = function (isValid) {
      $scope.error = null;
      // save the data from the form
      $scope.presentationTypeToSave = this.presentationType;
      $scope.instructionsToSave = this.instructions;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'blankRubricForm');

        return false;
      }

      // uses the find() function to get an array of blankRubrics, to make sure the one being created isn't a duplicate
      $scope.find();
      $scope.blankRubrics.$promise.then(function(data){
        console.log(data);
        console.log($scope.blankRubrics.length);
        for(var i=0; i < $scope.blankRubrics.length; i++){
          console.log($scope.blankRubrics[i].presentationType);
          // if the blankRubric is a duplicate, present message and do not save blankRubric
          if($scope.blankRubrics[i].presentationType === $scope.presentationTypeToSave){
            console.log('duplicate name encountered');
            confirm('A rubric already exists with this name. Please choose another presentation type.');
            return false;
          }
        }

        // Create new blankRubric object if the name is a duplicate
        var blankRubric = new BlankRubrics({
          presentationType: $scope.presentationTypeToSave,
          instructions: $scope.instructionsToSave,
          ratedItems: $scope.rubricItemsArray
        });

        // Redirect after save
        blankRubric.$save(function (response) {
          $state.go('blankRubrics.list', { successMessage: 'Rubric successfully saved!' });

          // Clear form fields
          $scope.presentationType = '';
          $scope.instructions = '';
          $scope.description1 = '';
          $scope.description2 = '';
          $scope.description3 = '';
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      });
    };

    /* Bind the success message to the scope if it exists as part of the current state */
    if($stateParams.successMessage) {
      $scope.success = $stateParams.successMessage;
    }

    // function to 'refresh' the blankRubrics part of the admin panel, so that when one is added/delete, the list is appropriately updated
    $scope.updateBlankRubrics = function(){
      BlankRubrics.query(function(refreshedBlankRubrics){
        $scope.blankRubrics = refreshedBlankRubrics;
      });
    };

    // Remove existing blankRubric after user confirms
    $scope.remove = function (blankRubric) {
      $scope.splicing = false;
      if (blankRubric) {
        if(confirm('Press OK to confirm deletion.')){
          blankRubric.$remove();

          for (var i in $scope.blankRubrics) {
            if ($scope.blankRubrics[i] === blankRubric) {
              $scope.blankRubrics.splice(i, 1);
              $scope.splicing = true;
            }
          }
        }
        else{
          return false;
        }
        if($scope.splicing === false)
          $scope.updateBlankRubrics();
          $scope.msg = true;
        $state.go('blankRubrics.list', { successMessage: 'Rubric successfully deleted!' });

      } else {
        $scope.blankRubric.$remove(function () {
          $scope.msg = true;
          $state.go('blankRubrics.list', { successMessage: 'Rubric successfully deleted!' });
        });
      }
    };

    // Update existing blankRubric only if the name isn't a duplicate
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'blankRubricForm');

        return false;
      }

      var blankRubric = $scope.blankRubric;

      $scope.find();
      $scope.count = 0;
      $scope.blankRubrics.$promise.then(function(data){
        for(var i = 0; i < $scope.blankRubrics.length; i++){
          if($scope.blankRubrics[i].presentationType === $scope.blankRubric.presentationType && $scope.blankRubrics[i]._id !== $scope.blankRubric._id){
            console.log('duplicate name encountered');
            confirm('A rubric already exists with this name. Please choose another presentation type.');
            return false;
          }
        }

        blankRubric.$update(function () {
          $location.path('blankRubrics/' + blankRubric._id);
          //redirect after update
          $state.go('blankRubrics.list', { successMessage: 'Rubric successfully updated!' });
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      });

    };

    // Find a list of blankRubrics
    $scope.find = function () {
      $scope.blankRubrics = BlankRubrics.query();
      console.log($scope.blankRubrics);
    };

    // Find existing blankRubric
    $scope.findOne = function () {
      $scope.blankRubric = BlankRubrics.get({
        blankRubricId: $stateParams.blankRubricId
      });
      console.log('finding blankRubric');
    };
  }
]);
