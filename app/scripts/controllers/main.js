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


    var perYearCounter = {};
    var best = {};
    var allTime = {};

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
              best[item.fields.annee] = {'year':item.fields.annee, 'artist': item.fields.auteur, 'nb': item.fields.nbre_de_prets}
            }

            /* petit test pour verifier que le champs cote est bien unique et correspond a un seul CD
            if(item.fields.cote === '099.2 OGR'){
              console.log(item);
            }
            */

            if (item.fields.cote in allTime) {
              allTime[item.fields.cote].nb += item.fields.nbre_de_prets;
            } else {
              allTime[item.fields.cote] = {
                  'item': item.fields,
                  'nb' : item.fields.nbre_de_prets
                };
            }


        });
        //allTime  = _.sortBy(allTime, ['nb'], ['desc']);
        console.log(allTime);
        //on transforme les données pour le chart
        _.each(perYearCounter, function(value, key) {
          $scope.labels.push(key);
          $scope.data.push(value);
        });
        //on copie dans le scope pour y accéder dans le tableau
        $scope.bestPerYear = best;
        $scope.allTime = _.sortBy(allTime, ['nb']);
    });
  });
