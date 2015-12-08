'use strict';

var _ = require('lodash');
var Controller = require('./controller.model');

// Get list of controllers
exports.index = function(req, res) {
  Controller.find(function (err, controllers) {
    if(err) { return handleError(res, err); }
    return res.json(200, controllers);
  });
};

// Get a single controller
exports.show = function(req, res) {
  Controller.findById(req.params.id, function (err, controller) {
    if(err) { return handleError(res, err); }
    if(!controller) { return res.send(404); }
    return res.json(controller);
  });
};

// Creates a new controller in the DB.
exports.create = function(req, res) {
  Controller.create(req.body, function(err, controller) {
    if(err) { return handleError(res, err); }
    return res.json(201, controller);
  });
};

// Updates an existing controller in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Controller.findById(req.params.id, function (err, controller) {
    if (err) { return handleError(res, err); }
    if(!controller) { return res.send(404); }
    var updated = _.merge(controller, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, controller);
    });
  });
};

// Deletes a controller from the DB.
exports.destroy = function(req, res) {
  Controller.findById(req.params.id, function (err, controller) {
    if(err) { return handleError(res, err); }
    if(!controller) { return res.send(404); }
    controller.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}