(function () {
    angular.module("mainApp").component("headerComponent",{
        templateUrl: "headerComponent.html",
        controller: headerController
    });

    function headerController() {
        var ctrl = this;
    }
})();