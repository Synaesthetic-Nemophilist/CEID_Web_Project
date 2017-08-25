var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

//Define Schema
var LocalEmpSchema = Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstname: {type: String, required: false, default: 'Anon'},
    lastname: {type: String, required: false},
    birthday: { type: Date, required: false, default: Date.now },
    role: {type: String, required: false, default: 'basic'},
    phonenumber: {type: Number, required: true},
    is: {type: String, default: "lsEmp"}
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

// Method for authenticating password
LocalEmpSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


//Export model
module.exports = mongoose.model('LocalEmp', LocalEmpSchema);