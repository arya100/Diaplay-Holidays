var app = angular.module("holidayApp", ["ui.router","ui.bootstrap"]);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider.state('home', {

        url: '/home',

        templateUrl: 'home.html',
        controller : 'homeCntrl'

    })

        .state('home.holidayList', {

        url: '/holidayList',
        templateUrl: 'holidayList.html',
        controller: 'homeCntrl'
    })

});

app.controller("homeCntrl", ['$scope','$rootScope', '$http', '$state', function($scope, $rootScope, $http,$state) {

    $http.get("https://holidayapi.com/v1/holidays?key=14e071b1-e45f-4212-ad15-0054b29a45ea&country=US&year=2016&month=02")
        .then(function(response) {
        console.log(response);

        $scope.holiday = response.data.holidays;
        $scope.details = function(index) {        
            for(var i=0;i<$scope.holiday.length;i++){
                if(index==$scope.holiday[i].name){
                    $scope.myFinalDetailsObject = $scope.holiday[i];
                    console.log($scope.myFinalDetailsObject.name);
                    $state.go('home.holidayList');
                }
            }



        }



    });



}]);

