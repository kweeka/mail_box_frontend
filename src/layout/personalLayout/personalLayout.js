(function () {
    angular.module("mainApp").component("personalLayout",{
        templateUrl: "personalLayout.html",
        controller: personalLayoutController,
        bindings: {
            user: "="
        }
    });

    function personalLayoutController() {
        var ctrl = this;
    }
})();