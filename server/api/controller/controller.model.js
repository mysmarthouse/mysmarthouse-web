'use strict';

var mongoose = require('mongoose-q')();
var Schema = mongoose.Schema;

var ControllerSchema = new Schema({
  name: String,
  type: {
    type: String,
    enum: ['relay'],
    default: 'relay'
  },
  pin: Number,
  boardId: String
});

module.exports = mongoose.model('Controller', ControllerSchema);
