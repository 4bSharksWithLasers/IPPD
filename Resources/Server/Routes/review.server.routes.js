var users = require('../Controllers/user.server.controller.js'),
	teams = require('../Controllers/team.server.controller.js'),
	blankRubrics = ('../Controllers/blankRubric.server.controller.js'),
	completedRatings = ('../Controllers/completedRating.server.controller.js'),
	express = require('express'),
	router = express.Router(); 

/*router.route('/')
Not sure what the exact routes need to be. 
*/

/*
  The 'router.param' method allows us to specify middleware we would like to use to handle 
  requests with a parameter.
  Say we make an example request to '/listings/566372f4d11de3498e2941c9'
  The request handler will first find the specific listing using this 'listingsById' 
  middleware function by doing a lookup to ID '566372f4d11de3498e2941c9' in the Mongo database, 
  and bind this listing to the request object.
  It will then pass control to the routing function specified above, where it will either 
  get, update, or delete that specific listing (depending on the HTTP verb specified)
 */

//not quite sure if this is the correct way to do it (can you have multiple router.param statements?)
router.param('userId', users.userById); 
router.param('teamId', teams.teamById);
router.param('blankRubricId', blankRubrics.blankRubricById); 
router.param('completedRatingId', completedRatings.completedRatingById);

module.exports = router; 