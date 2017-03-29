(function() {
    angular.module('mainApp')
        .controller('WaveGenController', ['$scope', '$http', '$location', '$cookies', '$rootScope', 'MessageFactory', 'UsersFactory', '$stateParams', 'AuthFactory', '$ocLazyLoad', function($scope, $http, $location, $cookies, $rootScope, mf, uf, $stateParams, AuthFactory, $ocLazyLoad) {

          $ocLazyLoad.load('/app/components/waveGen/waveGen.js');
        }]); // End Controller
}()); // End Anonymous Function
