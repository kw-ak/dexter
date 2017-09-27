"use strict";

angular.module('opendata', [])
  .service('openData', function(Restangular) {
    this.getTop500 = function() {
      var params = {
        dataset: 'top-500-des-cds-les-plus-empruntes-a-la-bibliotheque-de-toulouse',
        rows: -1
      };
      return Restangular.one("/").get(params).then(function(data) {
        return data;
      });
    };
  });
