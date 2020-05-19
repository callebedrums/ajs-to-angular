
define(['../app-ajs-requirejs.module', 'require'], function (module, require) {
  'use strict';

  module.controller('ChildController', ['$scope', function ($scope) {
    $scope.click = function () {
      // lazy loading test.js
      require(['./test'], function (test) {
        test();
      });
    }
  }]);
});
