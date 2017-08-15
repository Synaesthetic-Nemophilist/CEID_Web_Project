var Admin = require('../../db/models/Admin');


module.exports = function (router) {

    //Admin signup
    router.post('/admin', function (req, res) {
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
                    // req.flash('info', 'Username already taken!');
                    // res.redirect('signup');
                } else {
                    res.send('Admin created')
                    // req.session.admin = adminData;
                    // res.redirect('panel');
                }
            });
        }
    });

    return router;
};