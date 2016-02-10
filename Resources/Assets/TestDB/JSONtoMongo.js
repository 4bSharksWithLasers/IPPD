'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    User = require('./user-registration.server.model.js'), 
    config = require('./config');
    
/* Connect to your database. DONE*/
  mongoose.connect(config.db.uri);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("Connected!");

      /* 
        Instantiate a mongoose model for each user object in the JSON file, 
        and then save it to your Mongo database. DONE 
       */

    var usersToAdd = JSON.parse(fs.readFileSync('./users.json', 'utf8')).userEntries;
    var callback = function(err){
      if(err) throw err;
    }

    for(var i = 0; i < usersToAdd.length; i++){
        new User(usersToAdd[i]).save(callback);
    }

    console.log('Users added.');

  });
