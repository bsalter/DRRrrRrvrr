(function() {
    function DocController($routeParams,googleDrive,$scope,$sce) {
        var vm = this;
        var id = $routeParams.id;
        googleDrive.displayFile(id, function(doc) {
            vm.doc = $sce.trustAsHtml(doc);
            $scope.$digest();
        });
    }
    angular.module('drivetranslate').controller('DocController',['$routeParams','googleDrive','$scope','$sce', DocController]);

})();