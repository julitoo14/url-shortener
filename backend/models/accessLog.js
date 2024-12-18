const { Schema, model } = require('mongoose');

const AccessLogSchema = new Schema({
  urlId: {
    type: String, // Referencia a la URL correspondiente
    required: true,
    ref: 'Url',
  },
  ip: String,
  city: String,
  region: String,
  country: String,
  timezone: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('AccessLog', AccessLogSchema);
