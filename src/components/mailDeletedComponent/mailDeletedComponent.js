(function () {
    angular.module("mainApp").component("mailDeletedComponent", {
        templateUrl: "mailDeletedComponent.html",
        controller: mailDeletedController,
        bindings: {
            emails: "="
        }
    });

    function mailDeletedController() {
        var ctrl = this;
    }
})();