(function(){
    function googleDrive(client_id, scopes, $q) {
        var drive = this;
        var deferred = $q.defer();
        this.handleAuthClick = function() {
            gapi.auth.authorize(
                {client_id: client_id, scope: scopes, immediate: false},
                drive.handleAuthResult);
            return deferred.promise;
        };
        this.handleAuthResult = function(authResult) {
            if (authResult && !authResult.error) {
                drive.loadDriveApi();
            }
        };
        this.loadDriveApi = function() {
            gapi.client.load('drive', 'v2', function() {
                deferred.resolve();
            });
        };
        this.listFiles = function(callback) {
            drive.docs = [];
            var request = gapi.client.drive.files.list({
                'maxResults': 10,
                'q': "mimeType = 'application/vnd.google-apps.document'"
            });

            request.execute(function (resp) {
                var files = resp.items;
                if (files && files.length > 0) {
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        drive.docs.push(drive.createLink(file.id, file.title));
                    }
                } else {
                    drive.docs.push(drive.createLink('', 'No files found.'));
                }
                callback(drive.docs);
            });
        };

        this.displayFile = function() {
            var fileId = window.location.hash.substring(1);
            var request = gapi.client.drive.files.get({fileId: fileId});

            request.execute(function (resp) {
                var accessToken = gapi.auth.getToken().access_token;

                $.ajax({
                    url: resp.exportLinks["text/plain"],
                    type: "GET",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', "Bearer " + accessToken);
                    },
                    success: function (data) {
                        $('#output').html(data.replace(/\n/g, "<br>"));
                    }
                });

            });
        };

        /**
         * Append a link element to the body containing the given text
         * and a link to the /doc page.
         *
         * @param {string} id Id to be used in the link's href attribute.
         * @param {string} text Text to be placed in a element.
         */
        this.createLink = function(id, text) {
            var link = {};
            if (id != '') {
                link.href = '#/doc/'+id;
                link.text = text;
            } else {
                link.href = '';
                link.text = text;
            }
            return link;
        };

    }
    angular.module("drivetranslate").value("client_id","620000644214-vs6j7al5f6t1p3i1krp54q34ia27ml3p.apps.googleusercontent.com");
    angular.module("drivetranslate").value("scopes","https://www.googleapis.com/auth/drive.metadata.readonly");
    angular.module("drivetranslate").service("googleDrive",["client_id","scopes","$q",googleDrive]);
})();
