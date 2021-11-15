const mongoose = require('mongoose');


const CarSchema = new mongoose.Schema({
    plate_no: {
        type: String,
        // required: [true, 'plate number is required'],
    },
    plate_str: {
        type: String,
        // required: [true, 'plate number is required'],
    },

    maintenances: [{
        type: Date,
        // required: [true, 'Please add a rating between 1 and 10']
    }]
    ,
    qr_str: {
        type: String,
        // required: [true, 'plate number is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Car', CarSchema);
