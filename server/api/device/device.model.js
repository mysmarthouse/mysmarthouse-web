'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  name: String,
  boardId: String,
  pin: Number,
  //type: []
  active: Boolean
});

module.exports = mongoose.model('Device', DeviceSchema);
