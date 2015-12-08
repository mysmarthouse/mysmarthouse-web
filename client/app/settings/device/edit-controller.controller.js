'use strict';

angular.module('mysmarthouseWebApp')
  .controller('EditControllerCtrl', function ($scope) {
    $scope.message = 'Hello';
    $scope.controllerTypes = [
      {name: 'Relay'}
    ]
  });
