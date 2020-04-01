(function () {
    angular.module("mainApp").component("headerComponent",{
        templateUrl: "headerComponent.html",
        controller: headerController
    });

    function headerController(userService, authService, $state) {
        var ctrl = this;
        ctrl.$onInit = function() {
            ctrl.user = userService.getUser();
            if (ctrl.user){
                ctrl.auth = true;
            }
        };
        ctrl.logout = function () {
            authService.logout()
                .then(function (response) {
                    console.log(response);
                    localStorage.removeItem("authToken");
                    ctrl.user = null;
                    userService.clearUser();
                    $state.reload();
                }, function error(response) {
                    console.log(response);
                })
        }
    }
})();