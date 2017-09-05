//Import modules
var express     = require('express');
var morgan      = require('morgan');
var bodyParser  = require('body-parser');
var path        = require('path');

// Fetch api-stuffed router
var router      = express.Router();
var appRoutes   = require('./app/routes/api')(router);  // pass router to routes file


//App Instantiation
var app = express();

// Port based on env or use default
var port = process.env.port || 8080;

//Db Configuration & init
var db = require('./db/config');



// Middleware
app.use(morgan('dev'));  // for route logging
app.use(bodyParser.json());  // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')));
app.use('/npm_scripts', express.static(__dirname + '/node_modules/'));
app.use('/bower_scripts', express.static(__dirname + '/bower_components/'));

// Router Linking
app.use('/api', appRoutes);  // use backend api routes (distinguish these with angular's routes_


// All URLs lead to index.html
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname +'/index.html'));
});


// App start & listen
app.listen(port, function () {
    console.log('Server started on port ' + port);
});