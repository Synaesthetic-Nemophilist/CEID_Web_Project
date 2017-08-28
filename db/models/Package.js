let mongoose = require('mongoose');

let Schema = mongoose.Schema;


let PackageSchema = Schema({

    //TODO: not sure if these are necessary
    //sender_id: {type: Schema.ObjectId, ref: 'Sender', required: true},
    //recipient_id: {type: Schema.ObjectId, ref: 'Recipient', required: true},
    //transit_hub_id: {type: Schema.ObjectId, ref: 'TransitHub', required: true},

    Tracking_Number: {type: String, required: true},
    Express: {type: Boolean, required: true},
    Qr_code: {type: String},  //TODO: Fix qr code type later on
    Delivery_Address: {type: String, required: true},
    Cost: {type: Number, required: true},

    // Current location of the package
    Current_Location: {
        Longitude: {type: String},
        Latitude: {type: String}
    },

    // Array that holds all the previous of space-time
    // combinations of the package
    Hubs_Passed :  [
        {
            Date: {type: Date},
            Hub: [{type: Schema.ObjectId, ref: 'TransitHub'}]
        }],


});


module.exports = mongoose.model("Package", PackageSchema);