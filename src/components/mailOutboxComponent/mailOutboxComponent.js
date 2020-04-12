(function () {
    angular.module("mainApp").component("mailOutboxComponent", {
        templateUrl: "mailOutboxComponent.html",
        controller: mailOutboxController,
        bindings: {
            emails: "=",
            page: "="
        }
        });

    function mailOutboxController(mailStorage) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.emails = mailStorage.getEmails();
            ctrl.countMailBox = mailStorage.getCountOutbox();
            if(mailStorage.getEmails().length < mailStorage.getCountOutbox()){
                ctrl.showMoreMobile= true;
            }
        };
    }
})();