// BASE SETUP
// =============================================================================

// import dependencies
const {MORGAN} = require('./config');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')

// import mongoose for the DB
const mongoose = require('mongoose');

// instantiate middleware instances
const app = express();
app.use(morgan(MORGAN, {}));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================

// routes specific to User schema
  const haikuRouter = require('./routes/haiku');
  app.use('/haiku', haikuRouter);

  app.use(express.static('public'));

// app.get('/', function(req, res) {
//   let path = 'index.html';
//   res.sendFile(path, {root: './public'});
// });


// START THE SERVER
// =============================================================================
let server = function() {

  let server;

  return {

    runServer: function (db, port){

      mongoose.connect(db, function(err) {
        if(err){
          mongoose.disconnect();
        }

        server = app.listen(port, function() {
          console.log(`listenting on port ${port}`);
        });

      });
    }

  }

}();

// EXPORT THE SERVER
// =============================================================================
module.exports = server;
