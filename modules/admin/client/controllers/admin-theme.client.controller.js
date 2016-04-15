'use strict';

// Theme controller
angular.module('admin').controller('ThemeController', function($scope) {
  $scope.myStyle = {};
  $scope.colorChoice = "#eaeaea";
  $scope.colorChoice2 = "#2e2e2e";
  $scope.origLogo = '../../../../modules/core/client/img/brand/IPPD_COLOR.png';
  $scope.image_source = '../../../../modules/core/client/img/brand/IPPD_COLOR.png';
  $scope.myStyle={ 'background-color': '#eaeaea' };
  $scope.changeColor = function () {
    $scope.myStyle={ 'background-color':  $scope.colorChoice };
  };
  $scope.changeColor2 = function () {
    $scope.myStyle2={ 'background-color':  $scope.colorChoice2 };
  };  
  $scope.setLogo = function(element) {
    $scope.currentFile = element.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
      $scope.image_source = event.target.result;
      $scope.$apply();

    };
  // when the file is read it triggers the onload event above.
    reader.readAsDataURL(element.files[0]);
  };
  $scope.resetLogo = function() {
    $scope.image_source = $scope.origLogo;
    $scope.myStyle={ 'background-color': '#eaeaea' };
    $scope.myStyle2={ 'background-color': '#2e2e2e' };
    $scope.$apply();
  };  
});