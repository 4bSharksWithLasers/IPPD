'use strict';

// Registrants controller
angular.module('rubrics').controller('BlankRubricController', ['$scope', '$stateParams', '$location', 'Authentication', 'BlankRubrics',
  function ($scope, $stateParams, $location, Authentication, BlankRubrics) {
    $scope.authentication = Authentication;


    $scope.rubricItemsArray = [ { itemCategory:'', description1:'', description2:'', description3:'' } ];
    $scope.showRubricItem = false;
    $scope.editing = false; 
    $scope.rubricItemError = false;  
    var first = true;

    $scope.editItemCheck = function($index){
      if($scope.rubricItemsArray[$index].itemCategory === '' || $scope.rubricItemsArray[$index].description1 === '' || $scope.rubricItemsArray[$index].description2 === '' || $scope.rubricItemsArray[$index].description3 === '' || $scope.rubricItemsArray[$index].itemCategory === undefined || $scope.rubricItemsArray[$index].description1 === undefined || $scope.rubricItemsArray[$index].description2 === undefined || $scope.rubricItemsArray[$index].description3 === undefined){
        return true; 
      }
      else{
        $scope.editing = false; 
        return false; 
      }
    };

    $scope.editItemCheckArray = function(item, rubricArray){
      console.log(rubricArray[rubricArray.indexOf(item)]);
      if(rubricArray[rubricArray.indexOf(item)].itemCategory === '' || rubricArray[rubricArray.indexOf(item)].description1 === '' || rubricArray[rubricArray.indexOf(item)].description2 === '' || rubricArray[rubricArray.indexOf(item)].description3 === '' || rubricArray[rubricArray.indexOf(item)].itemCategory === undefined || rubricArray[rubricArray.indexOf(item)].description1 === undefined || rubricArray[rubricArray.indexOf(item)].description2 === undefined || rubricArray[rubricArray.indexOf(item)].description3 === undefined){
        return true; 
      }
      else{
        $scope.editing = false; 
        return false; 
      }
    };

    $scope.addRubricItem = function(){
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

    $scope.rmvRubricItem = function(item){
      $scope.rubricItemsArray.splice($scope.rubricItemsArray.indexOf(item), 1);
      if($scope.rubricItemsArray.length===0){
        first = true;
      }
    };

    $scope.addRubricItemArray = function(rubricArray){
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

    $scope.rmvRubricItemArray = function(item, rubricArray){
      console.log(item);
      console.log(rubricArray);
      rubricArray.splice(rubricArray.indexOf(item), 1);
      if(rubricArray.length===0){
        first = true;
      }
    };



    $scope.blankRubrics = null;

    // Create new blankRubric
    $scope.create = function (isValid) {
      $scope.error = null;
      $scope.presentationTypeToSave = this.presentationType;
      $scope.instructionsToSave = this.instructions; 

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'blankRubricForm');

        return false;
      }

      $scope.find();
      $scope.blankRubrics.$promise.then(function(data){
        console.log(data);
        console.log($scope.blankRubrics.length);
        for(var i=0; i < $scope.blankRubrics.length; i++){
          console.log($scope.blankRubrics[i].presentationType);
          if($scope.blankRubrics[i].presentationType === $scope.presentationTypeToSave){
            console.log('duplicate name encountered');
            confirm('A rubric already exists with this name. Please choose another name.');
            return false; 
          }
        }

        // Create new blankRubric object
        var blankRubric = new BlankRubrics({
          presentationType: $scope.presentationTypeToSave,
          instructions: $scope.instructionsToSave,
          ratedItems: $scope.rubricItemsArray
        });

        // Redirect after save
        blankRubric.$save(function (response) {
          $location.path('/blankRubrics');

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

    $scope.updateBlankRubrics = function(){
      BlankRubrics.query(function(refreshedBlankRubrics){
        $scope.blankRubrics = refreshedBlankRubrics;
      });
    };

    // Remove existing blankRubric
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
        if($scope.splicing === false)
          $scope.updateBlankRubrics();
        $location.path('/blankRubrics');
      } else {
        $scope.blankRubric.$remove(function () {
          $location.path('/blankRubrics');
        });
      }
    };

    // Update existing blankRubric
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'blankRubricForm');

        return false;
      }

      var blankRubric = $scope.blankRubric;
      
      blankRubric.$update(function () {
        $location.path('blankRubrics/' + blankRubric._id);
        //redirect after update
        $location.path('/blankRubrics');
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
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
