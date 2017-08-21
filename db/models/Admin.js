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

// Method for authenticating password
AdminSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


//Export model
module.exports = mongoose.model('Admin', AdminSchema);