'use strict';

// Theme controller
angular.module('admin').controller('ThemeController', function($scope) {
    $scope.myStyle = {};
    $scope.changeColor = function () {
    $scope.myStyle={'background-color': '#' + $scope.colorChoice};
  };
});