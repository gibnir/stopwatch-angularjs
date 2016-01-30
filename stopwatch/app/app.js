'use strict'; 

var stopwatchApp = angular.module('stopwatchApp',[
  'ngRoute',
  'stopwatchControllers',
  'stopwatchServices'
  ]);

stopwatchApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/main', {
        templateUrl: 'views/main-content.html'
      }).
      otherwise({
        redirectTo: '/main'
      });
  }]);