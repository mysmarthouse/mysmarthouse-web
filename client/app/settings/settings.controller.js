'use strict';

angular.module('mysmarthouseWebApp')
  .controller('SettingsCtrl', function($scope, Restangular) {
    $scope.devices = [];
    Restangular.all('sensors')
      .getList()
      .then(function(sensors) {
        sensors.forEach(function(item) {
          item.deviceType = 'sensor';
          $scope.devices.push(item);
        });
      })
      .then(function() {
        return Restangular.all('controllers').
        getList();
      })
      .then(function(controllers) {
        controllers.forEach(function(item) {
          item.deviceType = 'controller';
          $scope.devices.push(item);
        });
      })
      .then(function() {
        var socket = io();
        socket.on('sensor:data', function(data) {
          console.log(123);
          var sensor = _.findWhere($scope.devices, { _id: data._id });
          sensor.lastValue = data.value;
          $scope.$apply();
        });
        socket.on('sensor:status', function(data){
          var sensor = _.findWhere($scope.devices, { _id: data._id });
          sensor.connected = data.isConnected;
          $scope.$apply();
        })
      });

    //$scope.devices = [
    //  {deviceType: 'sensor', name: 'Humidity Sensor', connected: true, type: 'value', boardId: 2, pin: 6, lastValue: 10},
    //  {deviceType: 'sensor', name: 'Baro Sensor', connected: true, type: 'value',boardId: 2, pin: 6, lastValue: 1550},
    //  {deviceType: 'controller', name: 'Lamp 1', connected: true, type: 'relay',boardId: 2, pin: 6, lastValue: 10},
    //  {deviceType: 'sensor', name: 'Electricity Sensor', connected: false, type: 'electricity', boardId: 2, pin: 6,lastValue: 10},
    //  {deviceType: 'controller', name: 'White Bra', connected: true, type: 'relay',boardId: 2, pin: 6, lastValue: 10},
    //]
  });
