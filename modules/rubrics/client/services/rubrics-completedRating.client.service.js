<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 407e6c0844e126e4c28a90c9920a366fdd841b9f
'use strict';

//CompletedRatings service used for communicating with the completedRatings REST endpoints
angular.module('rubrics').factory('CompletedRatings', ['$resource',
  function ($resource) {
    return $resource('api/completedRatings/:completedRatingId', {
      completedRatingId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      query: {
        method:'GET',
        isArray: true
      }
    });
  }
]);
<<<<<<< HEAD
=======
=======
'use strict';

//CompletedRatings service used for communicating with the completedRatings REST endpoints
angular.module('rubrics').factory('CompletedRatings', ['$resource',
  function ($resource) {
    return $resource('api/completedRatings/:completedRatingId', {
      completedRatingId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
>>>>>>> 31be844c3aaa2c4cc56a4bb7dc09e1e032f8858d
>>>>>>> 407e6c0844e126e4c28a90c9920a366fdd841b9f
