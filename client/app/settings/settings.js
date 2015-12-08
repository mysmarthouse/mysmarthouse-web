'use strict';

angular.module('mysmarthouseWebApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/settings/settings.html',
        controller: 'SettingsCtrl'
      })
      .state('settings.addSensor', {
        url: '/add-sensor',
        onEnter: function($state, ngDialog) {
          ngDialog.open({
            template: 'app/settings/device/edit-sensor.html',
            controller: 'EditSensorCtrl',
            preCloseCallback: function(value) {
              $state.go('^');
            }
          });
        }
      })
      .state('settings.editSensor', {
        url: '/edit-sensor?sensorId',
        onEnter: function($state, ngDialog) {
          ngDialog.open({
            template: 'app/settings/device/edit-sensor.html',
            controller: 'EditSensorCtrl',
            preCloseCallback: function(value) {
              $state.go('^');
            }
          });
        }
      })
      .state('settings.addController', {
        url: '/add-controller',
        onEnter: function($state, ngDialog) {
          ngDialog.open({
            template: 'app/settings/device/edit-controller.html',
            controller: 'EditControllerCtrl',
            preCloseCallback: function(value) {
              $state.go('^');
            }
          });
        }
      })
      .state('settings.editController', {
        url: '/edit-controller?controllerId',
        onEnter: function($state, ngDialog) {
          ngDialog.open({
            template: 'app/settings/device/edit-controller.html',
            controller: 'EditControllerCtrl',
            preCloseCallback: function(value) {
              $state.go('^');
            }
          });
        }
      });
  });
