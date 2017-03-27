(function() {
    angular.module('mainApp')
        .controller('HomeController', ['$scope', 'UsersFactory', '$location', '$cookies', '$rootScope', 'Upload', '$stateParams', '$http', function($scope, uf, $location, $cookies, $rootScope, Upload, $stateParams, $http) {


            $scope.checkUser = function() {
                if ($cookies.get('auth')) {
                    return true;
                } else {
                    return false;
                };
            };

            $scope.register = function() {
                $scope.errors = []
                if ($scope.password != $scope.password2) {
                    $scope.errors.push({message: "Passwords need to match!"});
                };
                var newUser = $scope.user;
                uf.register(newUser, function(user, errMsg) {
                  if(errMsg) {
                    $scope.errors.push(errMsg)
                  }
                  else {
                    $location.url('success');
                  }
                });
            }; //End Register Function

            $scope.login = function() {
              console.log('In login');
              if ($scope.user && $scope.user.password) {
                uf.login($scope.user, function(creds, err) {
                  console.log(creds);
                  if(err) {
                    $scope.error = err.data.message;
                  } else {
                    let user = JSON.stringify(creds);
                    $cookies.put('auth', user);
                    getUser();
                    $scope.user = "";
                    $location.url('topics');
                  }
                });
              } else {
                $scope.error = "Email or password incorrect";
              };
            };

            // $scope.facebookLogin = function() {
            //   $http.get('/api/users/facebook/callback')
            //     .then(function(response) {
            //       console.log(response);
            //     })
            // };

            $scope.logout = function() {
                $cookies.remove('auth');
                $location.url('register');
            };

            function allUsers() {
              uf.getAllUsers(function(users) {
                  $scope.users = users.data;
              });
            };

            $scope.getAllUsers = function() {
                allUsers();
            };

            function removeUser(userId) {
              uf.deleteUser(userId);
              allUsers();
            };

            $scope.deleteUser = function(userId) {
                removeUser(userId);
            };

            function getUser() {
              if ($cookies.get('auth')) {
                let user = JSON.parse($cookies.get('auth'));
                uf.findByEmail(user.data, function(user) {
                  $scope.user = user.data;
                });
              };
            };

            $scope.getLoggedUser = function() {
              getUser();
            };

            getUser();

            $scope.updateUser = function() {
              if ($scope.name) {
                uf.update({name: $scope.name, email: $scope.user.email}, function(user){
                  var loggedUser = JSON.stringify({data: {email: user.data.email, token: user.data.authToken, id: user.data._id}});
                  $cookies.put('auth', loggedUser);
                  getUser();
                  $scope.name = "";
                })
              } else if ($scope.birthday) {
                uf.update({name: $scope.user.name, email: $scope.user.email, birthday: $scope.birthday}, function(user){
                  var loggedUser = JSON.stringify({data: {email: user.data.email, token: user.data.authToken, id: user.data._id}});
                  $cookies.put('auth', loggedUser);
                  getUser();
                  $scope.birthday = "";
                })
              }
            };

            //Upload Image
            $scope.$watch(function() {
              return $scope.file
            }, function() {
                $scope.upload($scope.file)
            });
            $scope.upload = function (file) {
              if (file){
                Upload.upload({
                  url: 'api/users/profile/editPhoto',
                  method: 'POST',
                  data: {userId: $scope.user._id},
                  file: file
                }).progress(function(evt){
                  getUser();
                  $location.url('profile');
                }).success(function(data){

                }).error(function(error){
                  console.log(error);
                })
              }
            };



        }]); // End Main Controller
}()); // End Anonymous Function
