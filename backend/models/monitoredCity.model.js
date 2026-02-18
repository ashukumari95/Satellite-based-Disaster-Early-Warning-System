const mongoose = require('mongoose');

const monitoredCitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

const MonitoredCity = mongoose.model('MonitoredCity', monitoredCitySchema);

module.exports = MonitoredCity;