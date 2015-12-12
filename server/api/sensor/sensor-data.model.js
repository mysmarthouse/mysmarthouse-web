'use strict';

//var mongoose = require('mongoose')
var mongoose = require('mongoose-q')();
var Schema = mongoose.Schema;

var SensorDataSchema = new Schema({
  _sensor: {type: mongoose.Schema.Types.ObjectId, ref: 'Sensor'},
  value: Number
});

module.exports = mongoose.model('SensorData', SensorDataSchema);
