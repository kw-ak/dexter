'use strict';

/**
 * @ngdoc function
 * @name dexterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dexterApp
 */
angular.module('dexterApp')
  .controller('MainCtrl', function($scope, openData, extractors, spinnerBtn) {

    //On déclanche le spinner au chargement de la page
    spinnerBtn.on();

    openData.getTop500().then(function(data) {
        //nombre de morceaux au total
        $scope.nhits = data.nhits;
        var dataMining = extractors.getDataMining(data);

        $scope.myLineChart = dataMining.chart;
        $scope.allTime = dataMining.allTime;
        $scope.bestPerYear = dataMining.bestPerYear;

        //tout s'est bien passé alors on desactive le spinner
        spinnerBtn.off();
      },
      //Error handler
      function() {
        spinnerBtn.off();
        window.alert('ERROR!!');
      });
  });
