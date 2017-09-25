'use strict';

/**
 * @ngdoc function
 * @name dexterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dexterApp
 */
angular.module('dexterApp')
  .controller('MainCtrl', function($scope, openData, spinnerBtn) {

    //On déclanche le spinner au chargement de la page
    spinnerBtn.on();

    openData.getTop500().then(function(data) {
        //number of total hits fetched
        $scope.nhits = data.nhits;

        //chart init
        $scope.myLineChart = {};
        $scope.myLineChart.labels = [];
        $scope.myLineChart.data = [];
        //end chart init

        var perYearCounter = {};
        var bestSellerByYear = {};
        var allTime = {};


        _.each(data.records, function(item) {


          //si il existe dans le dico on aggrège le nombre, sinon on créer une nouvelle entrée dans le dico
          if (item.fields.annee in perYearCounter) {
            perYearCounter[item.fields.annee] += item.fields.nbre_de_prets;
          } else {
            perYearCounter[item.fields.annee] = item.fields.nbre_de_prets;
          }


          //si il existe ou que le nombre d'emprunts est inférieur on fait rien
          if (item.fields.annee in bestSellerByYear && item.fields.nbre_de_prets < bestSellerByYear[item.fields.annee].nb) {
            //pass
          } else {
            //sinon on stocke le meilleur artiste
            bestSellerByYear[item.fields.annee] = {
              'item': item.fields,
              'nb': item.fields.nbre_de_prets
            }
          }


          var current_key = item.fields.auteur + '/' + item.fields.titre;
          if (current_key in allTime) {
            allTime[current_key].nb += item.fields.nbre_de_prets;
          } else {
            allTime[current_key] = {
              'item': item.fields,
              'nb': item.fields.nbre_de_prets
            };
          }


        });

        //on transforme les données pour le chart
        _.each(perYearCounter, function(value, key) {
          $scope.myLineChart.labels.push(key);
          $scope.myLineChart.data.push(value);
        });
        //on copie dans le scope pour y accéder dans le tableau
        $scope.bestPerYear = bestSellerByYear;
        $scope.allTime = _.sortBy(allTime, ['nb']);
        spinnerBtn.off();
      },
      //Error handler
      function(data) {
        spinnerBtn.off();
        alert("ERROR!!");
      });
  });
