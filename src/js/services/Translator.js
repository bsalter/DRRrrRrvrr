(function() {

    function translator(translateurl,$http) {
        this.translateDocument = function(doctext,callback) {
            doctext = encodeURIComponent(doctext);
            $http.get(translateurl+doctext)
                .then(function(data) {
                    var output = data.data.message.replace(/\n/g, "<br>");
                    callback(output);
                });
        };
    }
    angular.module("drivetranslate").value('translateurl',"http://ancient-anchorage-9224.herokuapp.com/zombify?q=");
    angular.module("drivetranslate").service('Translator',['translateurl','$http',translator]);
})();