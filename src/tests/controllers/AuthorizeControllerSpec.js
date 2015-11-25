describe("AuthorizeController", function() {
    var authorizeController, googleDrive, deferred, scope;
    beforeEach(function () {
        module('drivetranslate');
        module(function ($provide) {
            $provide.service('googleDrive', function($q) {
                this.docs = undefined;
                this.handleAuthClick = function() {
                    deferred = $q.defer();
                    return deferred.promise;
                };
                this.listFiles = function(callback) {
                    var arr = ["1"];
                    callback(arr, true);
                };
            });
        });

        inject(function ($controller, $rootScope, $injector) {
            scope = $rootScope.$new();
            authorizeController = $controller('AuthorizeController', {$scope: scope});
            googleDrive = $injector.get('googleDrive');
        });
    });

    describe("docs", function() {
        it("starts out with undefined docs variable", function() {
            expect(authorizeController.docs).toBeUndefined();
        });
        it("populates docs var based on googleDrive service's docs var, and sets hideButton = true when handleClick is called", function() {
            authorizeController.handleClick();
            deferred.resolve();
            scope.$apply();
            expect(authorizeController.docs).toEqual(["1"]);
            expect(authorizeController.hideButton).toBeTruthy();
        });
    });
    describe("handleClick", function() {
       it("calls googleDrive.handleAuthClick()", function() {
            spyOn(googleDrive,"handleAuthClick").and.callThrough();
            authorizeController.handleClick();
            expect(googleDrive.handleAuthClick).toHaveBeenCalled();
       });
        it("calls googleDrive.listFiles function", function() {
            spyOn(googleDrive,"listFiles");
            authorizeController.handleClick();
            deferred.resolve();
            scope.$apply();
            expect(googleDrive.listFiles).toHaveBeenCalled();
        });
    });
    describe("checkHideButton", function() {
       it("checks if the value of the hideButton variable is true or false", function() {
            expect(authorizeController.checkHideButton()).toBeTruthy();
            authorizeController.hideButton = true;
            expect(authorizeController.checkHideButton()).toBeFalsy();
       });
    });

});
