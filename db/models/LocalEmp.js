var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

//Define Schema
var LocalEmpSchema = Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});


// Password hash
LocalEmpSchema.pre('save', function (next) {
    var localEmp = this;
    bcrypt.hash(localEmp.password, null, null, function (err, hash) {
        if(err) return next(err);
        localEmp.password = hash;
        next();
    });
});


//Export model
module.exports = mongoose.model('LocalEmp', LocalEmpSchema);