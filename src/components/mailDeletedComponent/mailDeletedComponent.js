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
            ctrl.mailStorage = mailStorage;
            ctrl.countMailBox = mailStorage.getCountDeleted();
            if(mailStorage.getEmails().length < mailStorage.getCountDeleted()){
                ctrl.showMoreMobile= true;
            }
        };
    }
})();