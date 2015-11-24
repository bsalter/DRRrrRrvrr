(function() {

    function translator(translateurl) {
        this.translateDocument = function(doctext,callback) {
            doctext = encodeURIComponent(doctext);
            $.ajax({
                url: translateurl+doctext,
                type: "GET",
                success: function (data) {
                    var output = data.message.replace(/\n/g, "<br>");
                    callback(output);
                }
            });
        }
    }
    angular.module("drivetranslate").value('translateurl',"http://ancient-anchorage-9224.herokuapp.com/zombify?q=");
    angular.module("drivetranslate").service('Translator',['translateurl',translator]);
})();