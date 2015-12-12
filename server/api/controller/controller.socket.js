/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Controller = require('./controller.model');

exports.register = function(socket) {
  Controller.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Controller.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('controller:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('controller:remove', doc);
}