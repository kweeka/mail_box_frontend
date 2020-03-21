(function () {
    angular.module("mainApp").component("registrationLayout",{
        templateUrl: "registrationLayout.html",
        controller: registrationLayoutController,
        bindings: {
            user: "="
        }
    });

    function registrationLayoutController($state) {
        var ctrl = this;
        ctrl.$onInit = function() {
            if (ctrl.user) {
                $state.go("mailInbox");
            }
        };
    }
})();