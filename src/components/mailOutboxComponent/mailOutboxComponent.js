(function () {
    angular.module("mainApp").component("mailOutboxComponent", {
        templateUrl: "mailOutboxComponent.html",
        controller: mailOutboxController,
        bindings: {
            user: "="
        }
        });

    function mailOutboxController() {
        var ctrl = this;
    }
})();