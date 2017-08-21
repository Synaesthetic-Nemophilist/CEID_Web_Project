/**
 * Created by fortysixntwo on 21/08/2017.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var TransitHubEmpSchema = Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    //transit_hub_id: {type: Schema.ObjectId,ref: 'TransitHub', required: true}
});

// Password hashing BEFORE save to DB
TransitHubEmpSchema.pre('save', function(next) {
    var transitemp = this;

    bcrypt.hash(transitemp.password, null, null, function (err, hash){
        if (err) return next(err);
        transitemp.password = hash;
        next();
    });
});


TransitHubEmpSchema.methods.comparePassword =  function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });

};


module.exports = mongoose.model("TransitHubEmp",TransitHubEmpSchema);