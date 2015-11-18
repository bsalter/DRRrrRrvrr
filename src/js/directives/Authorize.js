(function() {
    function AuthorizeController(googleDrive, $scope) {
        var vm = this;
        vm.hideButton = false;
        vm.handleClick = function() {
            googleDrive.handleAuthClick().then(function() {
                googleDrive.listFiles(function(docs) {
                    vm.docs = docs;
                    vm.hideButton = true;
                    $scope.$apply();
                });
            });
        };
        vm.checkHideButton = function() {
            console.log(vm.hideButton);
            return vm.hideButton !== true;
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