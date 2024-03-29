const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({
  plate_no: {
    type: String,
    required: [true, 'plate number is required']
  },
  plate_str: {
    type: String,
    required: [true, 'plate String is required']
  },

  maintenances: [
    {
      type: Date
    }
  ],
  maintenance_period: {
    type: Number,
    default: 30
  },

  qr_str: {
    type: String,
    unique: true,
    required: [true, 'qr string is required']
  },
  charger_note: {
    type: String
    // required: [true, 'plate number is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Car', CarSchema)
