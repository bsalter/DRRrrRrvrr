(function() {
    function AuthorizeController(googleDrive, $scope) {
        var vm = this;
        vm.handleClick = function() {
            googleDrive.handleAuthClick().then(function() {
                googleDrive.listFiles(function(docs) {
                    vm.docs = docs;
                    $scope.$apply();
                });
            });
        };
    }
    function AuthorizeDirective() {
        return {
            restrict: 'E',
            controller: "AuthorizeController",
            controllerAs: 'vm',
            templateUrl: 'templates/authorize.html'
        }
    }
    angular.module("drivetranslate").controller("AuthorizeController",['googleDrive','$scope',AuthorizeController]);
    angular.module('drivetranslate').directive('authorize',AuthorizeDirective);
})();