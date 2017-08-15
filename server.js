//Import modules
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var admin = require('./db/models/Admin');

// Port based on env or use default
var port = process.env.port || 8080;

//App Instantiation
var app = express();

//Db Configuration & init
var db = require('./db/config');



// Middleware
app.use(bodyParser.json());  // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded
app.use(morgan('dev'));  // for route logging




app.listen(port, function () {
    console.log('Server started on port ' + port);
});