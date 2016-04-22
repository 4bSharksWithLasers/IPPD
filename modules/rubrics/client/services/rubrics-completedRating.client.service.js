<<<<<<< HEAD
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
