describe("translator service", function() {
    var $httpBackend, translator;
    var translationMock = "translation received";
    beforeEach(function() {
        module('drivetranslate');
        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            translator = $injector.get('Translator');
        });
        $httpBackend
            .when('GET', 'http://ancient-anchorage-9224.herokuapp.com/zombify')
            .respond(200, translationMock);
    });
    describe('translateDocument', function() {
        it("sends out an ajax request and receives text", function() {
            var text;
            translator.translateDocument("", function(text) {
                expect(text).toEqual("translation received");
            });
        });
    });
});