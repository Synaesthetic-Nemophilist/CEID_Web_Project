/**
 * Created by fortysixntwo on 21/08/2017.
 */


let mongoose = require('mongoose');

let Schema = mongoose.Schema;



let TransitHubSchema = Schema({

    Address: {
        City: {type: String, required: true},
        Street: {type: String, required: true},
        Number: {type: Number, required: true},
        Post_code: {type: Number, required: true}
    },

    Location: {
        Longitude: {type: String, required: true},
        Latitude: {type: String, required: true}
    },

    Phone_Number: {type: Number, required: true},

    Local_Store_Id: {type: Schema.ObjectId, ref: 'LocalStore', required: true, unique: true}

});

module.exports = mongoose.model("TransitHub", TransitHubSchema);