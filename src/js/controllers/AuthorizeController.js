(function() {
    function AuthorizeController(googleDrive, $scope) {
        var vm = this;
        vm.hideButton = false;
        if(googleDrive.docs !== undefined) {
            vm.docs = googleDrive.docs;
            vm.hideButton = true;
        }
        vm.handleClick = function() {
            googleDrive.handleAuthClick().then(function() {
                googleDrive.listFiles(function(docs, skipScope) {
                    vm.docs = docs;
                    vm.hideButton = true;
                    if(skipScope !== true) { // needed for unit testing
                        $scope.$apply();
                    }
                });
            });
        };
        vm.checkHideButton = function() {
            return vm.hideButton !== true;
        };
    }
    angular.module("drivetranslate").controller("AuthorizeController",['googleDrive','$scope',AuthorizeController]);
})();