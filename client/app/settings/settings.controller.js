'use strict';

angular.module('mysmarthouseWebApp')
  .controller('SettingsCtrl', function ($scope) {
    $scope.devices = [
      {deviceType: 'sensor', name: 'Humidity Sensor', connected: true, type: 'value', boardId: 2, pin: 6, lastValue: 10},
      {deviceType: 'sensor', name: 'Baro Sensor', connected: true, type: 'value',boardId: 2, pin: 6, lastValue: 1550},
      {deviceType: 'controller', name: 'Lamp 1', connected: true, type: 'relay',boardId: 2, pin: 6, lastValue: 10},
      {deviceType: 'sensor', name: 'Electricity Sensor', connected: false, type: 'electricity', boardId: 2, pin: 6,lastValue: 10},
      {deviceType: 'controller', name: 'White Bra', connected: true, type: 'relay',boardId: 2, pin: 6, lastValue: 10},
    ]
  });
