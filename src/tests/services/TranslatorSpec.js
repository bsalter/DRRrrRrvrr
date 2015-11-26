describe("translator service", function() {
    var $httpBackend, translator;
    var translationMock = {
          message: "translation received"
    };
    beforeEach(function() {
        module('drivetranslate');
        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            translator = $injector.get('Translator');
        });
        $httpBackend
            .when('GET', 'http://ancient-anchorage-9224.herokuapp.com/zombify?q=translation%20received')
            .respond(200, translationMock);
    });
    describe('translateDocument', function() {
        it("sends out an ajax request and receives text", function() {
            var text;
            translator.translateDocument("translation received", function(output) {
                text = output;
            });
            $httpBackend.flush();
            expect(text).toBe("translation received");
        });
    });
});