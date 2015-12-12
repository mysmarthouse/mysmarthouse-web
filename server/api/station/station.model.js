'use strict';

var mongoose = require('mongoose-q')();
var Schema = mongoose.Schema;

var StationSchema = new Schema({
  _user: String
});

module.exports = mongoose.model('Station', StationSchema);
