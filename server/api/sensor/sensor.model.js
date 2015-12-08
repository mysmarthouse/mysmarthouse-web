'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SensorSchema = new Schema({
  name: String,
  type: {
    type: String,
    enum: ['value', 'state', 'electricity'],
    default: 'value'
  },
  boardId: String,
  pin: Number
});

module.exports = mongoose.model('Sensor', SensorSchema);
