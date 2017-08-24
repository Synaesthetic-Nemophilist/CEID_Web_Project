let jwt     = require('jsonwebtoken');

let Admin   = require('../../db/models/Admin');

let secret  = 'supersupersecret12321';
let Lstore  = require('../../db/models/LocalStore');



module.exports = function (router) {

    //----------Local Store API----------
    // --------------------------------------------------------
    // Retrieve records for all localstores in the db
    router.get('/localstore', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Lstore.find({});
        query.exec(function(err, Lstores){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all users
            res.json(Lstores);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    router.post('/localstore', function(req, res){

        // Creates a new Local store based on the Mongoose schema and the post bo.dy
        let newstore = new Lstore(req.body);

        // New Local store is saved in the db.
        newstore.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
        });
    });


    //----------ADMIN API----------
    //Admin Register
    // http://localhost:port/api/admin
    router.post('/admin', function (req, res) {
        if( !req.body.username || !req.body.password ) {
            res.json({ success: false, message: 'Invalid Details' });
        } else {
            //Create an instance of an admin model
            let newAdmin = new Admin({
                username: req.body.username,
                password: req.body.password
            });
            //Save to db - handle errors, or set session variable and redirect to adminPanel
            newAdmin.save(function(err, adminData){
                if(err) {
                    res.json({ success: false, message: err.errmsg });
                    // console.log(err);
                    // req.flash('info', 'Username already taken!');
                    // res.redirect('signup');
                } else {
                    res.json({ success: true, message: 'Admin created!' });
                    // req.session.admin = adminData;
                    // res.redirect('panel');
                }
            });
        }
    });


    //-----------AUTHENTICATION-----------

    //Authenticate TODO: This function should be generalized for admins, localEmps and transitHubEmps!!!
    // http://localhost:port/api/authenticate
    router.post('/authenticate', function (req, res) {
        Admin.findOne({ username: req.body.username }).select('username password').exec(function (err, admin) {
            if(err) throw err;

            if(!admin) {
                res.json({ success: false, message: 'Could not authenticate user' });
            } else if(admin) {
                if(req.body.password) {
                    var validPassword = admin.comparePassword(req.body.password);
                } else {
                    res.json({ success: false, message: 'No password provided' });
                }
                if(!validPassword) {
                    res.json({ success: false, message: 'Could not authenticate password' });
                } else {
                    let token = jwt.sign({ username: admin.username }, secret, { expiresIn: '24h' });  //create jwt for session
                    res.json({ success: true, message: 'User authenticated!', token: token });
                }
            }
        })

    });


    // Middleware for verifying token (check existence, equality and expiration)
    router.use(function(req, res, next) {
        let token = req.body.token || req.body.query || req.headers['x-access-token'];

        if(token) {
            jwt.verify(token, secret, function (err, decoded) {
                if(err) {
                    res.json({ success: false, message: 'Token invalid' });
                } else {
                    req.decoded = decoded;  // if all ok, store decoded user info and pass onto next route
                    next();
                }
            });
        } else {
            res.json({ success: false, message: 'No token provided' });
        }
    });


    router.post('/current', function (req, res) {
        res.json(req.decoded);
    });


    //----------LOCAL EMP API----------

    //LocalEmp Register TODO: This happens ONLY VIA THE ADMIN, there is no special employee registration page view!!
    // http://localhost:port/api/localEmployee
    router.post('/localEmployee', function (req, res) {
        if( !req.body.username || !req.body.password ) {
            res.json({ success: false, message: 'Invalid Details' });
        } else {
            //Create an instance of an admin model
            let newLocalEmp = new LocalEmp({
                username: req.body.username,
                password: req.body.password
            });
            //Save to db - handle errors, or set session variable and redirect to adminPanel
            newLocalEmp.save(function(err, localEmpData){
                if(err) {
                    res.json({ success: false, message: err.errmsg });
                    // console.log(err);
                    // req.flash('info', 'Username already taken!');
                    // res.redirect('signup');
                } else {
                    res.json({ success: true, message: 'Local Employee created!' });
                    // req.session.admin = adminData;
                    // res.redirect('panel');
                }
            });
        }
    });



    return router;
};