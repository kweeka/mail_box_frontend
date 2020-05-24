(function () {
    angular.module("mainApp").component("mailDeletedComponent", {
        templateUrl: "mailDeletedComponent.html",
        controller: mailDeletedController,
        bindings: {
            emails: "=",
            page: "="
        }
    });

    function mailDeletedController(mailStorage, $timeout) {
        var ctrl = this;
        ctrl.$onInit = function () {
            $timeout(function () {
                ctrl.mailStorage = mailStorage;
            }, 1000);
            ctrl.countMailBox = mailStorage.getCountDeleted();
            if(mailStorage.getEmails().length < mailStorage.getCountDeleted()){
                ctrl.showMoreMobile= true;
            }
        };
    }
})();