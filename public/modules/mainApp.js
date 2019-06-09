//Angular Starter App
var main = angular.module("main", ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'Index.html',
                controller: 'tarifController'
                
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'Contact.html'
            })
			.state('tarifs', {
                url: '/tarifs',
                templateUrl: 'tarifs.html',
                controller: 'tarifController'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'About.html'
            })
//
//            .state('vivod',{
//                url: '/vivod',
//                templateUrl: 'vivod.html',
//                controller: 'myController'
//            })
			.state('vivod',{
                url: '/admin',
                templateUrl: 'vivod.html',
				controller: 'myController1'
            })
            .state('vivod2',{
                url: '/vivod2',
                templateUrl: 'vivod2.html',
				controller: 'myController11'
			})
            .state('auth_error', {
                url: '/auth_error',
            			    templateUrl: 'auth_error.html',
            			    controller: 'myController2'
            			})
            .state('save',{
                url: '/vstavka',
                templateUrl: 'vstavka.html',
                controller: 'myController2',
            })
            .state('udalenie',{
                url: '/udalenie',
                templateUrl: 'udalenie.html'
            })
            .state('redaktor',{
                url: '/redaktor',
                templateUrl: 'redaktor.html'
            })

            .state('login',{
                url: '/login',
                templateUrl: 'login.html',
                caseInsensitiveMatch: true,
                controller: 'AuthController'
            })
            .state('register',{
                url: '/register',
                templateUrl: 'register.html',
                caseInsensitiveMatch: true,
                controller: 'AuthController'
            })
			.state('unauth',{
                url: '/unauth',
                templateUrl: 'unauth.html',
                caseInsensitiveMatch: true
            })
            .state('successful',{
                url: '/successful',
                templateUrl: 'successful.html',
                caseInsensitiveMatch: true
            });  
                                           
    });


main.controller('myController', function($scope, $http) {
   $scope.vivod = [];
    var request = $http.get('/vivod');    
    request.success(function(vivod) {
        $scope.vivod = vivod;
    });
    request.error(function(vivod){
        console.log('Error: ' + vivod);
    });
});


main.controller('tarifController', function($scope, $http) {
    $scope.tarifs = [];
     var request = $http.get('/tarifs');    
     request.success(function(tarifs) {
         $scope.tarifs = tarifs;
     });
     request.error(function(tarifs){
         console.log('Error: ' + tarifs);
     });
 });

main.controller('myController1', function($scope, $http) {
	 $scope.$on('$viewContentLoaded', function(){
	claims_init();
  });
});

main.controller('myController11', function($scope, $http) {
    $scope.$on('$viewContentLoaded', function(){
   tarifs_init();
 });
});

main.controller('myController2', function ($scope, $location) {
    if (!$scope.authenticated)
    {
        $location.path("/auth_error");
    }
});

main.run(function($http,$rootScope){
    if(sessionStorage.length > 0){
        $rootScope.current_user = sessionStorage.current_user;
        $rootScope.authenticated = true;
    }else{
        $rootScope.authenticated = false;
        $rootScope.current_user = 'Guest';
    }
    
    $rootScope.signout = function(){
        $http.get('auth/signout');
        $rootScope.authenticated = false;
        //$rootScope.current_user = 'Guest';
        sessionStorage.clear();
    };
});       

module.exports = main;
