var myApp = angular.module("webApp",['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/home',{
            templateUrl:'View/home.html',
            controller:'homeController'
        })
        .when('/404',{
            templateUrl:'View/404.html',
            controller:'404Controller'
        })
        .otherwise({redirectTo:'/home'});
}]);