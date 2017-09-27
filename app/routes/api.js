let Victor = require('victor');
let NodeGeocoder = require('node-geocoder');
let QRCode = require('qrcode');
let pol = require('babel-polyfill');
let jwt     = require('jsonwebtoken');
let Graph = require('node-dijkstra');

let Admin   = require('../../db/models/Admin');
let Lstore  = require('../../db/models/LocalStore');
let LstoreEmp  = require('../../db/models/LocalEmp');
let Thub = require('../../db/models/TransitHub');
let ThEmp = require('../../db/models/TH_Employee');
let Package = require('../../db/models/Package');
let Network = require('../../db/models/Network');



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
                console.log(err);
                res.send(err);
            } else {
                res.json(Lstores);
            }
        });
    });

    router.get('/localstore/:id', function (req, res) {
        let query = Lstore.findById(req.params.id).populate('Stored_Packages');
        query.exec(function(err, Lstore){
            if(err) {
                res.send(err);
            } else {
                res.json(Lstore);
            }
        });
    });

    // Return closest city based on user's post code
    router.get('/localstore/pcode/:pcode', function (req, res) {
        let userCode = req.params.pcode;

        // Init and config geocode with options
        let options = {
            provider: 'google'
        };
        let geocoder = NodeGeocoder(options);

        // Find user coords based on input post_code
        geocoder.geocode({address: userCode, country: 'Greece'}, function(err, geo) {
            if(err) {
                console.log(err)
            } else {
                let userCoords = Victor(geo[0].longitude, geo[0].latitude);

                // Fetch all store location
                let query = Lstore.find({});
                query.exec(function(err, lStores){
                    if(err) {
                        console.log(err);
                    } else {

                        // Calculate coord distances and respond with closest store
                        let diffs = [];
                        lStores.forEach(function (store) {
                            let storeCoords = Victor(store.Location.Longitude, store.Location.Latitude);

                            diffs.push(userCoords.distance(storeCoords));
                        });

                        let minIndex = diffs.indexOf(Math.min.apply(Math, diffs));

                        res.json(lStores[minIndex]);
                    }
                });
            }
        });
    });

    // Return list of city names searched in autocomplete input on homepage
    router.get('/localstore/search/:city', function (req, res) {
        let cityInput = req.params.city;
        let regexp = new RegExp("^"+ cityInput);  // use regular expressions to match prefix

        let query = Lstore.find({ 'Address.City': regexp }).select('Address.City');
        query.exec(function (err, data) {
            if(err){
                console.log(err);
                res.send(err);
            } else {
                res.json(data);
            }
        })
    });


    // Return coords of path of cities (for polyline creating on homepage map)
    router.post('/network/path', function (req, res) {
        let path = req.body.cities;
        let cnt = 0;
        let coords = [];

        function asyncCoordsFetch(city, cb) {
            let query = Lstore.findOne({'Address.City': city}).select('Location');
            query.exec(function (err, data) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    cnt++;
                    coords.push({
                        latitude: data.Location.Latitude,
                        longitude: data.Location.Longitude
                    });
                    cb();
                }
            });
        }

        // for each city in package path, get coords and store in array to return to front-end
        let requests = path.reduce((promiseChain, item) => {
            return promiseChain.then(() => new Promise((resolve) => {
                asyncCoordsFetch(item, resolve);
            }));
        }, Promise.resolve());

        requests.then(() => res.json(coords));

    });

    // Provides method for saving new local stores in the db
    router.post('/localstore', function(req, res){

        // Creates a new Local store based on the Mongoose schema and the post body
        let newstore = new Lstore(req.body);

        // New Local store is saved in the db.
        newstore.save(function(err, lsData){
            if(err) {
                console.log(err);
                res.json({success: false, message: err.errmsg});
            } else {
                console.log(lsData);
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

    // Fetch transit hub by id
    router.get('/transithub/:id', function (req, res) {
        let query = Thub.findById(req.params.id).populate('Local_Store_Id');
        query.exec(function(err, thub){
            if(err) {
                res.send(err);
            } else {
                res.json(thub);
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

        Themp.findByIdAndRemove(req.params.id, function (err){
            if (err) return res.send(500, { error: err });
            return res.send("Succesfully deleted");
        });

    });


    //----------PACKAGE API----------
    // --------------------------------------------------------

    // For fetching all packages
    router.get('/package', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        let query = Package.find({}).populate('Hubs_Passed.Hub');
        query.exec(function(err, packages){
            if(err) {
                console.log(err);
                res.send(err);
            } else {
                res.json(packages);
            }
        });
    });

    // For creating a new package
    router.post('/package', function(req, res){

        // Creates a new Package obj based on the Mongoose schema and the post body
        let newPackage = new Package(req.body);

        // New package is saved in the db
        newPackage.save(function(err, packageData){
            if(err) {
                console.log(err);
                res.json({success: false, message: err.errmsg});
            } else {
                res.json({success: true, message: 'Package saved to DB'});
            }
        });
    });

    router.put('/package/:id', function(req, res){
        let pack = new Package(req.body);
        let query = {_id:req.params.id};

        Package.findOneAndUpdate(query, pack, {upsert:true}, function(err, doc){
            if (err) {
                res.send(err);
            } else {
                res.json(doc);
            }
        });
    });

    router.delete('/package/:id', function (req, res){
        Package.findByIdAndRemove(req.params.id, function (err,pack){
            if (err) {
                res.send(err);
            } else {
                res.json({success: true, message: 'Package deleted from DB'});
            }
        });

    });

    router.get('/package/:tn', function (req, res) {
        let query = Package.findOne({Tracking_Number: req.params.tn}).populate('Hubs_Passed.Hub');
        query.exec(function(err, packages){
            if(err) {
                res.send(err);
            } else {
                res.json(packages);
            }
        });
    });

    // Generate QR code based on tracking number and respond with it's info
    router.get('/package/qr/:tn', function (req, res) {
        QRCode.toDataURL(req.params.tn, function (err, url) {
            if (err) {
                res.send(err);
            } else {
                console.log(url);
                res.json(url);
            }
        })
    });



    //----------NETWORK API----------
    // --------------------------------------------------------
    // Fetch
    router.get('/network/:from/:to/:express', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        let query = Network.findOne({}).select('-_id -__v');
        query.exec(function(err, data){
            if(err) {
                res.send(err);
            } else {

                // Create graphs with costs and time and calc shortest path for both, return based on express flag
                const costGraph = new Graph();
                const timeGraph = new Graph();

                let entries = Object.entries(data._doc);

                entries.forEach(function (city) {
                    let inEntry = Object.entries(city[1]);
                    let neighborsCostMap = {};
                    let neighborsTimeMap = {};

                    inEntry.forEach(function (n) {
                        neighborsCostMap[n[0]] = n[1].cost;
                        neighborsTimeMap[n[0]] = n[1].time;
                    });

                    costGraph.addNode(city[0], neighborsCostMap);
                    timeGraph.addNode(city[0], neighborsTimeMap);
                });
                if(req.params.express === 'true') {
                    let timeInfo = timeGraph.path(req.params.from, req.params.to, {cost: true});

                    //calculate cost of this path via db query
                    let cost = 0;
                    let iter = 0;  // counter for triggering response to client
                    timeInfo.path.forEach(function (city, index, array) {
                        if(index < array.length-1) {
                            let next = array[index+1];
                            let query = {};
                            query[[city]+'.'+[next]+".cost"] = 1;
                            Network.findOne({}, query , function (err, data) {
                                if(err) {
                                    console.log(err);
                                } else {
                                    iter++;
                                    let n = data[city];
                                    cost += n[next].cost;

                                    // Return complete data
                                    if(iter === array.length-1) {
                                        let info = {
                                            path: timeInfo.path,
                                            cost: cost,
                                            time: timeInfo.cost
                                        };
                                        return res.json(info);
                                    }
                                }
                            });
                        }
                    });

                } else if(req.params.express === 'false') {
                    let costInfo = costGraph.path(req.params.from, req.params.to, { cost: true });

                    //calculate time of this path via db query
                    let time = 0;
                    let iter = 0;  // counter for triggering response to client
                    costInfo.path.forEach(function (city, index, array) {
                        if(index < array.length-1) {
                            let next = array[index+1];
                            let query = {};
                            query[[city]+'.'+[next]+".time"] = 1;
                            Network.findOne({}, query , function (err, data) {
                                if(err) {
                                    console.log(err);
                                } else {
                                    iter++;
                                    let n = data[city];
                                    time += n[next].time;

                                    // Return complete data
                                    if(iter === array.length-1) {
                                        let info = {
                                            path: costInfo.path,
                                            cost: costInfo.cost,
                                            time: time
                                        };
                                        return res.json(info);
                                    }
                                }
                            });
                        }
                    });
                }
            }
        });




    });

    // Network Schema has default values, so no data during post pls
    router.post('/network', function(req, res){

        // Creates a new Local store Employee based on the Mongoose schema and the post body
        let network = new Network(req.body);

        // New Transit Hub Employee is saved in the db.
        network.save(function(err, net){
            if(err) {
                res.json({success: false, message: err.errmsg});
            } else {
                res.json({success: true, message: 'Network saved to DB:\n' + net});
            }
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
                        res.json({success: true, message: 'Η πιστοποίηση ολοκληρώθηκε με επιτυχία!', token: token});
                    }
                }
            });
        } else if(req.body.is === "lsEmp") {
            LstoreEmp.findOne({username: req.body.username}).select('username password is local_store_id').exec(function (err, lsemp) {
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
                        let token = jwt.sign({username: lsemp.username, is: lsemp.is, storeId: lsemp.local_store_id}, secret);  //create jwt for session
                        res.json({success: true, message: 'Η πιστοποίηση ολοκληρώθηκε με επιτυχία!', token: token});
                    }
                }
            });
        } else if(req.body.is === "thEmp") {
            ThEmp.findOne({username: req.body.username}).select('username password is transit_hub_id').exec(function (err, themp) {
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
                        let token = jwt.sign({username: themp.username, is: themp.is, hubId: themp.transit_hub_id}, secret);  //create jwt for session
                        res.json({success: true, message: 'Η πιστοποίηση ολοκληρώθηκε με επιτυχία!', token: token});
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