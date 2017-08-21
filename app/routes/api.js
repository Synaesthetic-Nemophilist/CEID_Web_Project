var Admin = require('../../db/models/Admin');



module.exports = function (router) {

    //Admin signup
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

    return router;
};