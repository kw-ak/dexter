"use strict";

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
        var current_key = item.fields.auteur + '/' + item.fields.titre;
        if (current_key in allTime) {
          allTime[current_key].nb += item.fields.nbre_de_prets;
        } else {
          allTime[current_key] = {
            'item': item.fields,
            'nb': item.fields.nbre_de_prets
          };
        }

        /*
         * COUNT BY YEAR
         */
        //si il existe dans le dico on aggrège le nombre, sinon on créer une nouvelle entrée dans le dico
        if (item.fields.annee in perYearCounter) {
          perYearCounter[item.fields.annee] += item.fields.nbre_de_prets;
        } else {
          perYearCounter[item.fields.annee] = item.fields.nbre_de_prets;
        }


        /*
         * BEST OF EACH YEAR
         */
        //si il n'existe pas ou qu'il a un nombre d'emprunts supérieur on le stocke
        if (!(item.fields.annee in bestSellerByYear) || item.fields.nbre_de_prets > bestSellerByYear[item.fields.annee].nb) {
          bestSellerByYear[item.fields.annee] = {
            'item': item.fields,
            'nb': item.fields.nbre_de_prets
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
