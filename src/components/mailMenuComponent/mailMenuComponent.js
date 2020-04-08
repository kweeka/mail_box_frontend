(function () {
    angular.module("mainApp").component("mailMenuComponent",{
        templateUrl: "mailMenuComponent.html",
        controller: mailMenuController
    });

    function mailMenuController(mailStorage) {
        var ctrl = this;
        ctrl.count = mailStorage.getCount();
    }
})();