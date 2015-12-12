/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Station = require('./station.model');
var moment = require('moment');
var currentStation = { connected: false };

exports.register = function(socket) {

  socket.on('station:reset', function() {
    socket.broadcast.emit('station:reset');
  });

  socket.on('station:connect', function(stationId) {
    console.log('station connected', stationId);
    socket.on('disconnect', function(){
      console.log('station disconnected', stationId);
    })
    currentStation.connected = true;
    currentStation.socket = socket;

    socket.broadcast.emit('station:status', currentStation.connected);

    socket.on('station:ping', function() {
      currentStation.lastPingTime = moment();
    });

    setInterval(function() {
      if (!currentStation.lastPingTime) { return; }

      if (moment().diff(currentStation.lastPingTime, 'seconds') > 1 && currentStation.connected) {
        currentStation.connected = false;
        socket.broadcast.emit('station:status', currentStation.connected);
      }
      if (moment().diff(currentStation.lastPingTime, 'seconds') < 1 && !currentStation.connected) {
        currentStation.connected = true;
        socket.broadcast.emit('station:status', currentStation.connected);
      }
    }, 500);

  });

  socket.on('station:status:get', function(stationId, cb) {
    console.log(currentStation.connected)
    cb(currentStation.connected);
  });


};
