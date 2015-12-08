'use strict';

angular.module('mysmarthouseWebApp')
  .controller('EditSensorCtrl', function($scope, $stateParams, Restangular) {
    $scope.sensorId = $stateParams.sensorId;
    $scope.sensorTypes = [
      { name: 'value' },
      { name: 'state' },
      { name: 'electricity' }
    ];

    if ($scope.sensorId) {
      Restangular.one('sensors', $scope.sensorId).get()
        .then(function(sensor) {
          $scope.sensor = sensor;
        });
    }
    $scope.save = function() {
      if ($scope.sensorId) {
        return $scope.sensor.save().then(function() {
          $scope.closeThisDialog();
        });
      }
      Restangular.all('sensors')
        .post($scope.sensor)
        .then(function() {
          $scope.closeThisDialog();
        });
    };
    $scope.delete = function() {
      return $scope.sensor.remove()
        .then(function() {
          $scope.closeThisDialog();
        });
    };
  });
