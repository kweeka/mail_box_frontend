(function () {
    angular.module("mainApp").component("mailInboxLayout", {
        templateUrl: "mailInboxLayout.html",
        controller: mailInboxLayoutController,
        bindings: {
            user: "="
        }
        });

    function mailInboxLayoutController($state) {
        var ctrl = this;
        ctrl.$onInit = function () {
            if(!ctrl.user){
                $state.go("auth");
            }
        }
    }
})();