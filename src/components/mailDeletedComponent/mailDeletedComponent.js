(function () {
    angular.module("mainApp").component("mailDeletedComponent", {
        templateUrl: "mailDeletedComponent.html",
        controller: mailDeletedController,
        bindings: {
            emails: "=",
            page: "="
        }
    });

    function mailDeletedController(mailStorage) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.emails = mailStorage.getEmails();
        };
    }
})();