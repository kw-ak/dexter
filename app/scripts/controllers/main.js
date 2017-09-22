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

    $scope.labels = [];
    $scope.series = ['S1'];
    $scope.data = [];


    var counter = {};
    Restangular.one("/").get(query).then(function(data){
        $scope.nhits = data.nhits;
        _.each(data.records, function(item) {
            if (item.fields.annee in counter){
              counter[item.fields.annee] += item.fields.nbre_de_prets;
            } else {
              counter[item.fields.annee] = item.fields.nbre_de_prets;
            }
          //console.log(item.recordid);
        });

        _.each(counter, function(value, key) {
          $scope.labels.push(key);
          $scope.data.push(value);
        });
    });
  });
