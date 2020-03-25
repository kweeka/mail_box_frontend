(function () {
    angular.module("mainApp").component("authorizationLayout", {
        templateUrl: "authorizationLayout.html",
        controller: authorizationLayoutController,
        bindings: {
            user: "="
        }
    });

    function authorizationLayoutController($state) {
        var ctrl = this;
        ctrl.$onInit = function() {
            if (ctrl.user) {
                $state.go("mailInbox");
            }
        };
    }
})();