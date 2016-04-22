'use strict';

// Theme controller
angular.module('admin').controller('ThemeController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Themes',
  function ($scope, $state, $stateParams, $location, Authentication, Themes) {
    $scope.authentication = Authentication;	  
    $scope.themes = null;
    $scope.myStyle = {};
    //default values
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
    
    $scope.changeTheme = function (chColorChoice, chColorChoice2, chColorChoice3){
      console.log(chColorChoice);
      console.log(chColorChoice2);
      console.log(chColorChoice3);
      $scope.find();
      $scope.themes.$promise.then(function(data){
        if($scope.themes.length===0){
          console.log('length is zero');
          //if there is not a current theme saved, create one
          var themeChange = new Themes({
            headerColor: chColorChoice,
            bodyColor: chColorChoice2, 
            fontColor: chColorChoice3
          });
          themeChange.$save(function(response){
            $location.path('/adminHome');
          });
        }
        else{
          //if there is already a current theme, update it
          for(var i=0; i < $scope.themes.length; i++){
            $scope.themes[i].$remove();
          }
          $scope.themes.splice(0, $scope.themes.length);

          var themeChangeUpdate = new Themes({
            headerColor: chColorChoice,
            bodyColor: chColorChoice2, 
            fontColor: chColorChoice3
          });
          themeChangeUpdate.$save(function(response){
            $location.path('/adminHome');
          });
        }

      });
    };

    // Find a list of teams
    $scope.find = function () {
      $scope.themes = Themes.query();
    };
     	
  }]);

