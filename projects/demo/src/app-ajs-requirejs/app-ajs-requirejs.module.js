define([
  "angular",
  "require",
  "../../../ajs-to-angular/src/ajs",
  "@uirouter/angularjs",
], function (angular, require, lib) {
  "use strict";

  var module = angular.module("AppAjsRequirejsModule", [
    // adding the RouterLink directive implemented by the lib to navigate back to Angular components
    lib.RouteIntegrationModule.name,
  ]);

  module.config([
    "$stateProvider",
    function ($stateProvider) {
      $stateProvider
        .state("ajs-requirejs", {
          url: "",
          template:
            '<h1>App AJS Requirejs view {{ date }}</h1><br/><a ui-sref="child">Child</a>',
          controller: "AppAjsRequirejsController",
        })
        .state("child", {
          url: "/child",
          template: require("./child/child.controller.html").default,
          controller: "ChildController",
        });
    },
  ]);

  return module;
});
