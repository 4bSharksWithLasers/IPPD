'use strict';

// Theme controller
angular.module('admin').controller('ThemeController', function($scope) {
  $scope.myStyle = {};
  $scope.changeColor = function () {
    $scope.myStyle={ 'background-color': '#' + $scope.colorChoice };
  };
  $scope.setFile = function(element) {
    $scope.currentFile = element.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
      $scope.image_source = event.target.result;
      $scope.$apply();

    };
  // when the file is read it triggers the onload event above.
    reader.readAsDataURL(element.files[0]);
  };
});