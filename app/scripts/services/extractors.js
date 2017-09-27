'use strict';

angular.module('extractors', [])
  .service('extractors', function() {

    function counterToChart(counter) {
      var chart = {};
      chart.labels = [];
      chart.data = [];
      _.each(counter, function(value, key) {
        chart.labels.push(key);
        chart.data.push(value);
      });
      return chart;
    }

    this.getDataMining = function(data) {

      var perYearCounter = {};
      var bestSellerByYear = {};
      var allTime = {};


      _.each(data.records, function(item) {


        /*
         * ALL TIME
         */
        var currentKey = item.fields.auteur + '/' + item.fields.titre;
        if (currentKey in allTime) {
          allTime[currentKey].nb += item.fields.nbreDePrets;
        } else {
          allTime[currentKey] = {
            'item': item.fields,
            'nb': item.fields.nbreDePrets
          };
        }

        /*
         * COUNT BY YEAR
         */
        //si il existe dans le dico on aggrège le nombre, sinon on créer une nouvelle entrée dans le dico
        if (item.fields.annee in perYearCounter) {
          perYearCounter[item.fields.annee] += item.fields.nbreDePrets;
        } else {
          perYearCounter[item.fields.annee] = item.fields.nbreDePrets;
        }


        /*
         * BEST OF EACH YEAR
         */
        //si il n'existe pas ou qu'il a un nombre d'emprunts supérieur on le stocke
        if (!(item.fields.annee in bestSellerByYear) || item.fields.nbreDePrets > bestSellerByYear[item.fields.annee].nb) {
          bestSellerByYear[item.fields.annee] = {
            'item': item.fields,
            'nb': item.fields.nbreDePrets
          };
        }


      });


      //on transforme les données pour le chart
      var chart = counterToChart(perYearCounter);

      return {
        chart: chart,
        allTime: _.sortBy(allTime, ['nb']),
        bestPerYear: bestSellerByYear
      };
    };
  });
