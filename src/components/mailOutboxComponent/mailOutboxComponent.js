(function () {
    angular.module("mainApp").component("mailOutboxComponent", {
        templateUrl: "mailOutboxComponent.html",
        controller: mailOutboxController
        });

    function mailOutboxController() {
        var ctrl = this;
    }
})();