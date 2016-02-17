angular.module('users').factor('Users', ['$http', 
	function($http){
		var methods = {
			getAll: function(){
				return $http.get('http://localhost:8080/api/users')
			}, 

			create: function(user){
				return $http.post('http://localhost:8080/api/users', user);
			},

			read: function(id){
				return $http.get('http://localhost:8080/api/users/' + id);
			},

			update: function(id, user){
				return $http.put('http://localhost:8080/api/users/' + id, user);
			}, 

			delete: function(id){
				return $http.delete('http://localhost:8080/api/users/' + id);
			}
		};

		return methods; 
	}]);
