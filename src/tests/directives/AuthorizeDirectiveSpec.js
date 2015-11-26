// Note: this spec is sparse because testing the functionality of this directive is handled by the
// AuthorizeController spec.
describe('authorize directive', function(){
    var compile, scope, compiledDirective;
    beforeEach(function(){
        module('templates', 'drivetranslate');

        inject(function($compile, $rootScope){
            compile = $compile;
            scope = $rootScope.$new();
        });

        var element = angular.element('<authorize></authorize>')
;
        compiledDirective = compile(element)(scope);
        scope.$digest();

    });
    it("should have a button with text = Authorize", function(){
        var button = compiledDirective.find('button');
        expect(button.text()).toBe("Authorize");
    });
    it("should contain an unordered list", function(){
        var list = compiledDirective.find('ul');
        expect(list).not.toBeUndefined();
    });
});