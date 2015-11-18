(function() {
    angular.module('drivetranslate', ['ngRoute']);

    angular.module('drivetranslate').config(['$routeProvider',function($routeProvider) {
        $routeProvider
            .when('/list', {
                templateUrl: 'templates/list.html'
            }).when('/doc/:id', {
                templateUrl: 'templates/doc.html',
                controller: 'DocController',
                controllerAs: 'vm'
            }).otherwise({
                redirectTo: '/list'
            })
    }]);
})();