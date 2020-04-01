(function () {
    angular.module("mainApp").component("textFilter", {
        templateUrl: "textFilter.html",
        controller: textFilterController,
        bindings: {
            text: "=",
            label: "<"
        }
    });
    function textFilterController() {
        var ctrl = this;
    }
})();