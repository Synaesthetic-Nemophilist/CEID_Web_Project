let mongoose = require('mongoose');

let Schema = mongoose.Schema;


let PackageSchema = Schema({

    //TODO: not sure if these are necessary
    //sender_id: {type: Schema.ObjectId, ref: 'Sender', required: true},
    //recipient_id: {type: Schema.ObjectId, ref: 'Recipient', required: true},
    //transit_hub_id: {type: Schema.ObjectId, ref: 'TransitHub', required: true},

    Date_Sent: {type: Date},
    Tracking_Number: {type: String, required: true, unique: true},
    Express: {type: Boolean, required: true},
    Qr_code: {type: String},
    Sent_From: {type: String},
    Full_Path: [{type: String}],
    Delivery_Address: {type: String, required: true},
    Cost: {type: Number, required: true},
    Estimated_Days: {type: Number, required: true},
    Ready_For_Pickup: {type: Boolean, default: false},

    // Current location of the package
    Current_Location: {
        City: {type: String},
        Longitude: {type: String},
        Latitude: {type: String}
    },

    // Array that holds all the previous of space-time
    // combinations of the package
    Hubs_Passed :  [
        {
            Date: {type: Date},
            Hub: {type: Schema.ObjectId, ref: 'TransitHub'}
        }],


});


module.exports = mongoose.model("Package", PackageSchema);