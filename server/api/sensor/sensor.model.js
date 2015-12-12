'use strict';

var mongoose = require('mongoose-q')();
var Schema = mongoose.Schema;

var SensorSchema = new Schema({
  name: String,
  type: {
    type: String,
    enum: ['value', 'state', 'electricity'],
    default: 'value'
  },
  boardId: String,
  lastValue: Number,
  connected: Boolean,
  lastUpdated: Date,
  pin: Number
});

module.exports = mongoose.model('Sensor', SensorSchema);
