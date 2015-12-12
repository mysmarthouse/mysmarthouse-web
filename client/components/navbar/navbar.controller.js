'use strict';

angular.module('mysmarthouseWebApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    $scope.station = {};

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    var socket = io();
    socket.emit('station:status:get', 1, function(status){
      $scope.station.connected = status;
      $scope.$apply();
    });
    socket.on('station:status', function(status){
      $scope.station.connected = status;
      $scope.$apply();
    });

    $scope.resetStation = function(){
      socket.emit('station:reset');
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
