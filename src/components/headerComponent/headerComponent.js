(function () {
    angular.module("mainApp").component("headerComponent",{
        templateUrl: "headerComponent.html",
        controller: headerController
    });

    function headerController(userService) {
        var ctrl = this;
            ctrl.$onInit = function() {
                ctrl.user = userService.getUser();
                if (ctrl.user){
                    ctrl.auth = true;
                }
            };
    }
})();