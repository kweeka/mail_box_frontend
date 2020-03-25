(function () {
    angular.module("mainApp").component("mailLayout", {
        templateUrl: "mailLayout.html",
        controller: mailLayoutController,
        bindings: {
            user: "="
        }
        });

    function mailLayoutController($state) {
        var ctrl = this;
        ctrl.$onInit = function () {
            if(!ctrl.user){
                $state.go("auth");
            }
        }
    }
})();