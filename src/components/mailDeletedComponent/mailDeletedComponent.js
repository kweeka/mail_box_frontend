(function () {
    angular.module("mainApp").component("mailDeletedComponent", {
        templateUrl: "mailDeletedComponent.html",
        controller: mailDeletedController,
        bindings: {
            emails: "=",
            page: "="
        }
    });

    function mailDeletedController() {
        var ctrl = this;
    }
})();