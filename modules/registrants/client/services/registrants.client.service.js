'use strict';

angular.module('registrants').factory('registrants', ['$http', 
function($http){
  var methods = {
    getAll: function(){
      return $http.get('http://localhost:8080/api/registrants');
    }, 

    create: function(registrant){
      return $http.post('http://localhost:8080/api/registrants', registrant);
    },

    read: function(id){
      return $http.get('http://localhost:8080/api/registrants/' + id);
    },

    update: function(id, registrant){
      return $http.put('http://localhost:8080/api/registrants/' + id, registrant);
    }, 

    delete: function(id){
      return $http.delete('http://localhost:8080/api/registrants/' + id);
    }
  };

  return methods; 
}]);
