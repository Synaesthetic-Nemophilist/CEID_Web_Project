var express = require('express');
var morgan = require('morgan');

// Port based on env or use default
var port = process.env.port || 8080;

//App Instantiation
var app = express();

//Db Configuration & init
var db = require('./db/config');



// Middleware
app.use(morgan('dev'));  // for route logging




app.listen(port, function () {
    console.log('Server started on port ' + port);
});