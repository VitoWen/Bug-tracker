var bugTrackerApp = angular.module('bugTrackerApp', ['ui.router']);

bugTrackerApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
    tracker = {
        apiUrl: 'http://localhost:7367/tracker'
    };

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url:'/',
        templateUrl: 'views/login/login.html',
        controller: 'loginTracker'
    })
    .state('tracker', {
        url: '^/tracker',
        template: '<bug-tracker></bug-tracker>'
    });

}]);
