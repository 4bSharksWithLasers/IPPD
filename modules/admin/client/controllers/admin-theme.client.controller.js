'use strict';

// Theme controller
angular.module('admin').controller('ThemeController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Themes',
  function ($scope, $state, $stateParams, $location, Authentication, Themes) {
  $scope.authentication = Authentication;	  
  $scope.themes = null;
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
    // Update existing theme
    $scope.update = function () {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'themeForm');

        return false;
      }

      var theme = $scope.theme;

      $scope.find();
      $scope.themes.$promise.then(function(data){
        theme.$update(function () {
          $location.path('theme/' + theme._id);
          //redirect path after deletion
          $state.go('themes.list', { successMessage: 'Theme successfully updated!' });
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      });

    };  
      // Find a list of themes
    $scope.find = function () {
      $scope.themes = Themes.query();
    };	
}]);