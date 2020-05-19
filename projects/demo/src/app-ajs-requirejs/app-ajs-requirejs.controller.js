
define(['./app-ajs-requirejs.module'], function (module) {
  'use strict';

  module.controller('AppAjsRequirejsController', [
    '$scope',
    function ($scope) {
      $scope.date = new Date().toString();
    }
  ]);

  return module;
});
