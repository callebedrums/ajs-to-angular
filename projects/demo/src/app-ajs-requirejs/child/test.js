
define(['../app-ajs-requirejs.module'], function (module) {
  'use strict';

  return function () {
    console.log('test lazy load', module.name);
  };
});
