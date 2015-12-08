'use strict';

angular.module('mysmarthouseWebApp')
  .controller('EditControllerCtrl', function ($scope, Restangular, $stateParams) {
    $scope.controllerId = $stateParams.controllerId;
    $scope.message = 'Hello';
    $scope.controllerTypes = [
      {name: 'relay'}
    ];

    if ($scope.controllerId) {
      Restangular.one('controllers', $scope.controllerId).get()
        .then(function(controller) {
          $scope.controller = controller;
        });
    }
    $scope.save = function() {
      if ($scope.controllerId) {
        return $scope.controller.save().then(function() {
          $scope.closeThisDialog();
        });
      }
      Restangular.all('controllers')
        .post($scope.controller)
        .then(function() {
          $scope.closeThisDialog();
        });
    };
    $scope.delete = function() {
      return $scope.controller.remove()
        .then(function() {
          $scope.closeThisDialog();
        });
    };
  });
