(function() {
    function DocController($routeParams,googleDrive,$scope,$sce,translator) {
        var vm = this;
        var id = $routeParams.id;
        vm.displayFile = function() {
            googleDrive.displayFile(id, function(doc) {
                translator.translateDocument(doc, function(text) {
                    vm.doc = $sce.trustAsHtml(text);
                });
            });
        };
        vm.displayFile();
    }
    angular.module('drivetranslate').controller('DocController',['$routeParams','googleDrive','$scope','$sce','Translator',DocController]);

})();