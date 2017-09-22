'use strict';

/**
 * @ngdoc overview
 * @name dexterApp
 * @description
 * # dexterApp
 *
 * Main module of the application.
 */
angular
  .module('dexterApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'config',
    'restangular'
  ])
  .config(function ($routeProvider, RestangularProvider, ENV) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });

      RestangularProvider.setBaseUrl(ENV.api);
  });
