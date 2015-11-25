describe("DocController", function() {
    var scope, docController, googleDrive;
    beforeEach(function () {
        module('drivetranslate');
        module(function ($provide) {
            $provide.service('googleDrive', function() {
                this.displayFile = function(id, callback) {
                    callback();
                };
            });
        });

        inject(function ($controller, $rootScope, $injector) {
            scope = $rootScope.$new();
            docController = $controller('DocController', {$scope: scope});
            googleDrive = $injector.get('googleDrive');
        });
    });
    describe("displayFile", function() {
        it("calls googleDrive.displayFile when displayFile is called", function() {
            spyOn(googleDrive,"displayFile");
            docController.displayFile();
            expect(googleDrive.displayFile).toHaveBeenCalled();
        });
    });

});