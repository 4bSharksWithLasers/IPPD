'use strict';

// Theme controller
angular.module('admin').controller('ThemeController', function($scope) {
  $scope.myStyle = {};
  $scope.origLogo = '../../../../modules/core/client/img/brand/IPPD_COLOR.png';
  $scope.changeColor = function () {
    $scope.myStyle={ 'background-color': '#' + $scope.colorChoice };
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
    $scope.$apply();
  };  
});