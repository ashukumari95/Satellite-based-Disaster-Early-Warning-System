const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please provide an alert type (e.g., flood, drought)'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      index: '2dsphere',
    },
    address: String,
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: false, // Could be system-generated
  },
}, { timestamps: true });

const Alert = mongoose.model('Alert', alertSchema);
module.exports = Alert;