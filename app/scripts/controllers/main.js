'use strict';

/**
 * @ngdoc function
 * @name dexterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dexterApp
 */
angular.module('dexterApp')
  .controller('MainCtrl', function ($scope, Restangular) {

    var query = {
      dataset : 'top-500-des-cds-les-plus-empruntes-a-la-bibliotheque-de-toulouse',
      rows: -1
    };
    Restangular.one("/").get(query).then(function(data){
        $scope.nhits = data.nhits;
        _.each(data.records, function(item) {
          console.log(item.recordid);
        });
    });
  });
