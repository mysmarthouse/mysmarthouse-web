'use strict';

angular.module('mysmarthouseWebApp')
  .controller('EditSensorCtrl', function ($scope) {
    $scope.message = 'Hello';
    $scope.sensorTypes = [
      {name: 'Value'},
      {name: 'State'},
      {name: 'Electricity'}
    ]
  });
