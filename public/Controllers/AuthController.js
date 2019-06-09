// контроллер auth
main.controller("AuthController", function ($scope, $http, $rootScope, $location) {
$scope.user = {username: '', password: ''};
$scope.error_message = '';
// входной вызов к webapi (сервис, реализованный при помощи node)
$scope.login = function(){
        $http.post('/auth/login', $scope.user).success(function(data){
        if(data.state == 'success'){
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $rootScope.sess = data.user;
                sessionStorage.setItem('current_user', $rootScope.sess.username);
                $location.path('/');
                }
            else{
                $scope.error_message = data.message;
                $rootScope.sess = null;
            }
        });
};
  // входной вызов к webapi (сервис, реализованный при помощи node)
    $scope.register = function(){
console.log($scope.user);
        $http.post('/auth/signup', $scope.user).success(function(data){
if(data.state == 'success'){
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $location.path('/');
            }
            else{
                $scope.error_message = data.message;
            }
        });
    };

});
