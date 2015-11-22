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
            return vm.hideButton !== true;
        };
    }
    angular.module("drivetranslate").controller("AuthorizeController",['googleDrive','$scope',AuthorizeController]);
})();