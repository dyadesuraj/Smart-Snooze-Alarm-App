const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
  time: String,
  snoozePattern: [Number],
  sound: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alarm', alarmSchema);