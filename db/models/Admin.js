var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Define Schema
var AdminSchema = Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});


//Export model
module.exports = mongoose.model('Admin', AdminSchema);