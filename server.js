//Import modules
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var Admin = require('./db/models/Admin');

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


// Routes TODO: move to sep dir and file
//TODO: Use router
//Admin signup
app.post('/admin', function (req, res) {
    if( !req.body.username || !req.body.password ) {
        res.status("400");
        res.send("Invalid details");
    } else {
        //Create an instance of an admin model
        var newAdmin = new Admin({
            username: req.body.username,
            password: req.body.password
        });
        //Save to db - handle errors, or set session variable and redirect to adminPanel
        newAdmin.save(function(err, adminData){
            if(err) {
                res.send(err.errmsg);
                // console.log(err);
                // req.flash('info', 'Username already taken!');  //TODO: FIX THIS TO SPECIFY ERROR!!!!
                // res.redirect('signup');
            } else {
                res.send('Admin created')
                // req.session.admin = adminData;
                // res.redirect('panel');
            }
        });
    }
});



app.listen(port, function () {
    console.log('Server started on port ' + port);
});