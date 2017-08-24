/**
 * Created by fortysixntwo on 21/08/2017.
 */


var mongoose = require('mongoose');

var Schema = mongoose.Schema;




var LocalStoreSchema = Schema({

    //transit_hub_id: {type: Schema.ObjectId, ref: 'TransitHub', required: true}, TODO: implement in admin crud form
    phone_number: {type: Number, required: true},

    Address: {
        City: {type: String, required: true},
        Street: {type: String, required: true},
        Number: {type: Number, required: true},
        Post_code: {type: Number, required: true}
    },


    Location: {
        Longitude: {type: String},
        Latitude: {type: String}
    },

    // All stored packages in the current Store
    // Stored_packages: [{
    //     package_id: { type: Schema.ObjectId, ref:'Package', unique: true} TODO: implement in admin crud form
    //
    // }]

});


module.exports = mongoose.model("LocalStore",LocalStoreSchema);