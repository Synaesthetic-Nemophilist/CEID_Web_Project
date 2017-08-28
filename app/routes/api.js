let jwt     = require('jsonwebtoken');

let Admin   = require('../../db/models/Admin');
let Lstore  = require('../../db/models/LocalStore');
let LstoreEmp  = require('../../db/models/LocalEmp');
let Thub = require('../../db/models/TransitHub');
let ThEmp = require('../../db/models/TH_Employee');


let secret  = 'supersuperseret12321';

module.exports = function (router) {

    //----------Local Store API----------
    // --------------------------------------------------------
    // Retrieve records for all localstores in the db
    router.get('/localstore', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        let query = Lstore.find({}).populate('Stored_Packages');
        query.exec(function(err, Lstores){
            if(err) {
                res.send(err);
            } else {
                res.json(Lstores);
            }
        });
    });

    // Provides method for saving new local stores in the db
    router.post('/localstore', function(req, res){

        // Creates a new Local store based on the Mongoose schema and the post body
        let newstore = new Lstore(req.body);

        // New Local store is saved in the db.
        newstore.save(function(err, lsData){
            if(err) {
                res.json({success: false, message: err.errmsg});
            } else {
                res.json({success: true, message: 'Local Store saved to DB'});
            }
        });
    });

    router.put('/localstore/:id', function(req, res){

        let newStore = new Lstore(req.body);
        let query = {_id:req.params.id};

        Lstore.findOneAndUpdate(query, newStore, {upsert:true}, function(err, doc){
            if (err) return res.send(500, { error: err });
            return res.send("succesfully saved");
        });

    });

    router.delete('/localstore/:id', function (req, res){

        Lstore.findByIdAndRemove(req.params.id, function (err,offer){
            if (err) return res.send(500, { error: err });
            return res.send("succesfully deleted");
        });

    });

    //----------Transit Hub API----------
    // --------------------------------------------------------
    // Retrieve records for all transit hubs in the db
    router.get('/transithub', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        let query = Thub.find({}).populate('Local_Store_Id');
        query.exec(function(err, Thubs){
            if(err) {
                res.send(err);
            } else {
                res.json(Thubs);
            }
        });
    });

    // Provides method for saving new transit hubs in the db
    router.post('/transithub', function(req, res){

        // Creates a new Local store based on the Mongoose schema and the post body
        let newhub = new Thub(req.body);

        // New Local store is saved in the db.
        newhub.save(function(err, thData){
            if(err) {
                res.json({success: false, message: err});
            } else {
                res.json({success: true, message: 'Transit Hub saved to DB'});
            }
        });
    });

    //----------Local Store Employee API----------
    // --------------------------------------------------------
    // Retrieve records for all localstoreEployees in the db

    router.get('/localstoreEmp', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        let query = LstoreEmp.find({}).populate('local_store_id');
        query.exec(function(err, Lstoreemps){
            if(err) {
                res.send(err);
            } else {
                res.json(Lstoreemps);
            }
        });
    });

    // Provides method for saving new users in the db
    router.post('/localstoreEmp', function(req, res){

        // Creates a new Local store Employee based on the Mongoose schema and the post body
        let newemp = new LstoreEmp(req.body);

        // New Local store Employee is saved in the db.
        newemp.save(function(err, lsEmpData){
            if(err) {
                console.log(err);
                res.json({success: false, message: err.errmsg});
            } else {
                console.log(lsEmpData);
                res.json({success: true, message: 'Local Store Employee saved to DB'});
            }
        });
    });


    router.put('/localstoreEmp/:id', function(req, res){

        let newemp = new LstoreEmp(req.body);
        let query = {_id:req.params.id};

        LstoreEmp.findOneAndUpdate(query, newemp, {upsert:true}, function(err, doc){
            if (err) return res.send(500, { error: err });
            return res.send("succesfully saved");
        });
    });

    router.delete('/localstoreEmp/:id', function (req, res){

        LstoreEmp.findByIdAndRemove(req.params.id, function (err,offer){
            if (err) return res.send(500, { error: err });
            return res.send("succesfully deleted");
        });

    });

    //----------Transit Hub Employee API----------
    // --------------------------------------------------------
    // Retrieve records for all transit hub Employees in the db
    router.get('/transitHubEmp', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        let query = ThEmp.find({}).populate('transit_hub_id');
        query.exec(function(err, themps){
            if(err) {
                res.send(err);
            } else {
                console.log(themps);
                res.json(themps);
            }
        });
    });

    // Provides method for saving new users in the db
    router.post('/transitHubEmp', function(req, res){

        // Creates a new Local store Employee based on the Mongoose schema and the post body
        let newemp = new ThEmp(req.body);

        // New Transit Hub Employee is saved in the db.
        newemp.save(function(err, thEmpData){
            if(err) {
                res.json({success: false, message: err.errmsg});
            } else {
                res.json({success: true, message: 'Transit Hub Employee saved to DB'});
            }
        });
    });


    router.put('/transitHubEmp/:id', function(req, res){

        let newemp = new ThEmp(req.body);
        let query = {_id:req.params.id};

        ThEmp.findOneAndUpdate(query, newemp, {upsert:true}, function(err, doc){
            if (err) return res.send(500, { error: err });
            return res.send("succesfully saved");
        });
    });

    router.delete('/transitHubEmp/:id', function (req, res){

        Themp.findByIdAndRemove(req.params.id, function (err,offer){
            if (err) return res.send(500, { error: err });
            return res.send("succesfully deleted");
        });

    });


    //----------ADMIN API----------
    // --------------------------------------------------------
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
                } else {
                    res.json({ success: true, message: 'Admin created!' });
                }
            });
        }
    });


    //-----------AUTHENTICATION-----------

    //Authenticate TODO: This function should be generalized for admins, localEmps and transitHubEmps!!!
    // http://localhost:port/api/authenticate
    router.post('/authenticate', function (req, res) {
        if(req.body.is === "admin") {
            Admin.findOne({username: req.body.username}).select('username password is').exec(function (err, admin) {
                if (err) throw err;

                if (!admin) {
                    res.json({success: false, message: 'Could not authenticate user'});
                } else if (admin) {
                    if (req.body.password) {
                        var validPassword = admin.comparePassword(req.body.password);
                    } else {
                        res.json({success: false, message: 'No password provided'});
                    }
                    if (!validPassword) {
                        res.json({success: false, message: 'Could not authenticate password'});
                    } else {
                        let token = jwt.sign({username: admin.username, is: admin.is}, secret);  //create jwt for session
                        res.json({success: true, message: 'User authenticated!', token: token});
                    }
                }
            });
        } else if(req.body.is === "lsEmp") {
            LstoreEmp.findOne({username: req.body.username}).select('username password is').exec(function (err, lsemp) {
                if (err) throw err;

                if (!lsemp) {
                    res.json({success: false, message: 'Could not authenticate user'});
                } else if (lsemp) {
                    if (req.body.password) {
                        var validPassword = lsemp.comparePassword(req.body.password);
                    } else {
                        res.json({success: false, message: 'No password provided'});
                    }
                    if (!validPassword) {
                        res.json({success: false, message: 'Could not authenticate password'});
                    } else {
                        let token = jwt.sign({username: lsemp.username, is: lsemp.is}, secret);  //create jwt for session
                        res.json({success: true, message: 'User authenticated!', token: token});
                    }
                }
            });
        } else if(req.body.is === "thEmp") {
            ThEmp.findOne({username: req.body.username}).select('username password is').exec(function (err, themp) {
                if (err) throw err;

                if (!themp) {
                    res.json({success: false, message: 'Could not authenticate user'});
                } else if (themp) {
                    if (req.body.password) {
                        var validPassword = themp.comparePassword(req.body.password);
                    } else {
                        res.json({success: false, message: 'No password provided'});
                    }
                    if (!validPassword) {
                        res.json({success: false, message: 'Could not authenticate password'});
                    } else {
                        let token = jwt.sign({username: themp.username, is: themp.is}, secret);  //create jwt for session
                        res.json({success: true, message: 'User authenticated!', token: token});
                    }
                }
            });
        } else {
            res.json({success: false, message: 'Not a valid user'});
        }

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


    return router;
};