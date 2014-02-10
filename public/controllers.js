angular.module('calculator',['ngRoute'])

.config(function($routeProvider){
  $routeProvider
    .when('/oil',{
      controller:'OilCtrl',
      templateUrl:'oil.html'
    })
    .when('/salary',{
      controller:'SalaryCtrl',
      templateUrl:'salary.html'
    })
    .otherwise({
      redirectTo:'/'
    });
});
