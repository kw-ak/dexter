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
    var best = {}

    //le base url est définir dans le module de config
    Restangular.one("/").get(query).then(function(data){
        $scope.nhits = data.nhits;
        _.each(data.records, function(item) {
            //si il existe dans le dico on aggrège le nombre, sinon on créer une nouvelle entrée dans le dico
            if (item.fields.annee in counter){
              counter[item.fields.annee] += item.fields.nbre_de_prets;
            } else {
              counter[item.fields.annee] = item.fields.nbre_de_prets;
            }


            //si il existe ou que le nombre d'emprunts est inférieur on fait rien
            if (item.fields.annee in best && item.fields.nbre_de_prets < best[item.fields.annee].nb){
              //pass
            }else {
              //sinon on stocke le meilleur artiste
              best[item.fields.annee] = {'year':item.fields.annee, 'artist': item.fields.auteur, 'nb': item.fields.nbre_de_prets}
            }
        });

        //on transforme les données pour le chart
        _.each(counter, function(value, key) {
          $scope.labels.push(key);
          $scope.data.push(value);
        });
        //on copie dans le scope pour y accéder dans le tableau
        $scope.bestPerYear = best;
    });
  });
