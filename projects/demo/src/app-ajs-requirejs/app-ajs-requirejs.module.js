
define([
  'angular',
  'projects/ajs-to-angular/src/ajs',
  '@uirouter/angularjs'
], function (angular, lib) {
  'use strict';

  var module = angular.module('AppAjsRequirejsModule', [
    lib.RouteIntegrationModule.name
  ]);

  module.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('ajs-requirejs', {
      url: '',
      template: '<h1>App AJS Requirejs view {{ date }}</h1><br/><a ui-sref="child">Child</a>',
      controller: 'AppAjsRequirejsController'
    }).state('child', {
      url: '/child',
      template: require('./child/child.controller.html'),
      controller: 'ChildController'
    });
  }]);

  return module;
});
