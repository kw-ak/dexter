"use strict";

angular.module('spinnerbtn', [])
.service('spinnerBtn', function($rootScope) {
  return {
      on: function() {
        $rootScope.spinner = {active: true};
      },
      off: function() {
        $rootScope.spinner = {active: false};
      }
    }
  });
