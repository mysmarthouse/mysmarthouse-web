/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Sensor = require('./sensor.model');
var _ = require('lodash');
var SensorData = require('./sensor-data.model');
var moment = require('moment');
var sensors = [];

exports.register = function(socket) {

  socket.on('sensor:status', function(sensor) {
    console.log('pudating sensor status...')
    Sensor.findById(sensor._id).execQ()
      .then(function(sensor) {
        if (!sensor) { return; }
        var updated = _.merge(sensor, {
          connected: sensor.isConnected
        });
        return updated.saveQ();
      })
      .then(function(){
        socket.broadcast.emit('sensor:status', sensor);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  socket.on('sensor:data', function(sensorData) {
    function updateSensorValue() {
      return Sensor.findById(sensorData._id).execQ()
        .then(function(sensor) {
          if (!sensor) { return; }
          var updated = _.merge(sensor, {
            lastValue: sensorData.value,
            lastUpdated: moment().format()
          });
          return updated.saveQ();
        });
    }

    function addSensorData() {
      var newSensorData = {
        _sensor: sensorData._id,
        value: sensorData.value
      };
      return SensorData.createQ(newSensorData);
    }

    function broadcastDataUpdate() {
      socket.broadcast.emit('sensor:data', sensorData);
    }

    updateSensorValue()
      .then(addSensorData)
      .then(broadcastDataUpdate)
      .catch(function(err) {
        console.log(err);
      });
  });


  Sensor.schema.post('save', function(doc) {
    onSave(socket, doc);
  });
  Sensor.schema.post('remove', function(doc) {
    onRemove(socket, doc);
  });
};

function onSave(socket, doc, cb) {
  socket.emit('sensor:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('sensor:remove', doc);
}
