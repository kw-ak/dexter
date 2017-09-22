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

    $scope.limit = 10;
    var query = {
      dataset : 'top-500-des-cds-les-plus-empruntes-a-la-bibliotheque-de-toulouse',
      rows: -1
    };

    $scope.labels = [];
    $scope.series = ['S1'];
    $scope.data = [];


    var perYearCounter = {};
    var best = {};
    var allTime = {};

    $scope.spinner = {active : true};
    //le base url est définir dans le module de config
    Restangular.one("/").get(query).then(function(data){
        $scope.nhits = data.nhits;
        _.each(data.records, function(item) {
            //si il existe dans le dico on aggrège le nombre, sinon on créer une nouvelle entrée dans le dico
            if (item.fields.annee in perYearCounter){
              perYearCounter[item.fields.annee] += item.fields.nbre_de_prets;
            } else {
              perYearCounter[item.fields.annee] = item.fields.nbre_de_prets;
            }


            //si il existe ou que le nombre d'emprunts est inférieur on fait rien
            if (item.fields.annee in best && item.fields.nbre_de_prets < best[item.fields.annee].nb){
              //pass
            }else {
              //sinon on stocke le meilleur artiste
              best[item.fields.annee] = {'item': item.fields, 'nb': item.fields.nbre_de_prets}
            }


            var current_key = item.fields.auteur + '/' + item.fields.titre;
            if (current_key in allTime) {
              allTime[current_key].nb += item.fields.nbre_de_prets;
            } else {
              allTime[current_key] = {
                  'item': item.fields,
                  'nb' : item.fields.nbre_de_prets
                };
            }


        });

        //on transforme les données pour le chart
        _.each(perYearCounter, function(value, key) {
          $scope.labels.push(key);
          $scope.data.push(value);
        });
        //on copie dans le scope pour y accéder dans le tableau
        $scope.bestPerYear = best;
        $scope.allTime = _.sortBy(allTime, ['nb']);
        $scope.spinner = {active : false};
    },
    function(data) {
        $scope.spinner = {active : false};
        alert("ERROR!!");
        // Handle error here
    });
  });
