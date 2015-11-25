(function() {
    function AuthorizeDirective() {
        return {
            restrict: 'E',
            controller: "AuthorizeController",
            controllerAs: 'vm',
            templateUrl: 'templates/authorize.html'
        };
    }
    angular.module('drivetranslate').directive('authorize',AuthorizeDirective);
})();