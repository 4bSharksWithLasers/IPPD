angular.module('registrants').factory('registrants', ['$http', 
	function($http){
		var methods = {
			getAll: function(){
				return $http.get('http://localhost:8080/api/registrants')
			}, 

			create: function(registrants){
				return $http.post('http://localhost:8080/api/registrants', user);
			},

			read: function(id){
				return $http.get('http://localhost:8080/api/registrants/' + id);
			},

			update: function(id, registrants){
				return $http.put('http://localhost:8080/api/registrants/' + id, user);
			}, 

			delete: function(id){
				return $http.delete('http://localhost:8080/api/registrants/' + id);
			}
		};

		return methods; 
	}]);
