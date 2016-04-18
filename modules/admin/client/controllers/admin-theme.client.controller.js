'use strict';

// Theme controller
angular.module('admin').controller('ThemeController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'CssList', 
  function ($scope, $state, $stateParams, $location, Authentication, CssList) {
    $scope.authentication = Authentication;

    $scope.myStyle = {};
    $scope.colorChoice = '#eaeaea';
    $scope.colorChoice2 = '#2e2e2e';
    $scope.colorChoice3 = '#FFFFFF';
    $scope.origLogo = '../../../../modules/core/client/img/brand/IPPD_COLOR.png';
    $scope.image_source = '../../../../modules/core/client/img/brand/IPPD_COLOR.png';
    $scope.myStyle={ 'background-color': '#eaeaea' };
    $scope.changeColor = function () {
      $scope.myStyle={ 'background-color':  $scope.colorChoice };
    };
    $scope.changeColor2 = function () {
      $scope.myStyle2={ 'background-color':  $scope.colorChoice2 };
    };
    $scope.changeColor3 = function () {
      $scope.myStyle3={ 'color':  $scope.colorChoice3 };
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
      $scope.colorChoice='#eaeaea';
      $scope.colorChoice2='#2e2e2e';
      $scope.colorChoice3='#FFFFFF';
      $scope.myStyle={ 'background-color': '#eaeaea' };
      $scope.myStyle2={ 'background-color': '#2e2e2e' };
      $scope.myStyle3={ 'color': '#FFFFFF' };
      $scope.$apply();
    };  

    $scope.create = function(chColorChoice, chColorChoice2, chColorChoice3){
      console.log(chColorChoice);
      console.log(chColorChoice2);
      console.log(chColorChoice3);
      var themeChange = new CssList({
        currentHeader: chColorChoice, 
        currentBody: chColorChoice2,
        currentFont: chColorChoice3
      });
      themeChange.$save(function(response){
        $state.go('adminHome');
      });

    };
  }
]);