(function() {
    angular.module('mainApp')
        .controller('WaveGenController', ['$scope', '$http', '$location', '$cookies', '$rootScope', 'MessageFactory', 'UsersFactory', '$stateParams', 'AuthFactory', '$ocLazyLoad', function($scope, $http, $location, $cookies, $rootScope, mf, uf, $stateParams, AuthFactory, $ocLazyLoad) {

          $ocLazyLoad.load('/app/components/waveGen/waveGen.js');
          $ocLazyLoad.load('/app/assets/js/p5.min.js');
          // $ocLazyLoad.load('/app/assets/js/p5.sound.js');



        }]); // End Controller
}()); // End Anonymous Function


    // <script src="/app/components/waveGen/waveGen.js" charset="utf-8"></script>
