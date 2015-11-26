describe("googleDrive service", function() {
    var googleDrive, client_id, scopes;
    var mockGapi = {
        auth: {
                authorize: function() {}
        },
        client: {
                load: function() {}
        }
    };
    beforeEach(function() {
        module('drivetranslate');
        inject(function ($injector) {
            googleDrive = $injector.get('googleDrive');
            client_id = $injector.get('client_id');
            scopes = $injector.get('scopes');
        });
    });
    describe("handleAuthClick", function() {
        it("calls gapi.auth.authorize", function() {
            spyOn(mockGapi.auth,"authorize");
            googleDrive.handleAuthClick(mockGapi);
            expect(gapi.auth.authorize).toHaveBeenCalled();
        });
        it("calls gapi.auth.authorize with handleAuthResult and configuration parameters", function() {
            spyOn(mockGapi.auth,"authorize");
            var testobj = {
                client_id:client_id,
                scope:scopes,
                immediate:false
            };
            googleDrive.handleAuthClick(mockGapi);
            expect(gapi.auth.authorize).toHaveBeenCalledWith(testobj, googleDrive.handleAuthResult);
        });
    });
    describe("handleAuthResult", function() {
        it("does not call loadDriveApi if authResult.error is false", function() {
            spyOn(googleDrive,"loadDriveApi");
            var testobj = {
                error: true
            };
            googleDrive.handleAuthResult(testobj);
            expect(googleDrive.loadDriveApi).not.toHaveBeenCalled();
        });
        it("calls loadDriveApi if authResult.error is not false", function() {
            spyOn(googleDrive,"loadDriveApi");
            var testobj = {
                error: false
            };
            googleDrive.handleAuthResult(testobj);
            expect(googleDrive.loadDriveApi).toHaveBeenCalled();
        });
    });
    describe("loadDriveApi", function() {
        it("calls gapi.client.load", function() {
            spyOn(mockGapi.client,"load");
            googleDrive.loadDriveApi(mockGapi);
            expect(gapi.client.load).toHaveBeenCalled();
        });
    });
});