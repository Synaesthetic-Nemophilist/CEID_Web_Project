var express = require('express');
var morgan = require('morgan');

var app = express();
var port = process.env.port || 8080;


// Middleware
app.use(morgan('dev'));  // for route logging




app.listen(port, function () {
    console.log('Server started on port ' + port);
});