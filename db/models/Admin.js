var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

//Define Schema
var AdminSchema = Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});


// Password hash
AdminSchema.pre('save', function (next) {
    var admin = this;
    bcrypt.hash(admin.password, null, null, function (err, hash) {
        if(err) return next(err);
        admin.password = hash;
        next();
    });
});


//Export model
module.exports = mongoose.model('Admin', AdminSchema);