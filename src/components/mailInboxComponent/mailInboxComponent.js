(function () {
    angular.module("mainApp")
        .component("mailInboxComponent",{
            templateUrl: "mailInboxComponent.html",
            controller: mailInboxController
        });

    function mailInboxController(authService, $state, userService) {
        var ctrl = this;
        /*if (localStorage.getItem("authToken")) {
            authService.getUserInfo()
                .then(function success(response) {
                    userService.setUser(response.data.response.name, response.data.response.email, response.data.response.groups);
                }, function error(response) {
                    console.log(response);
                    $state.go("auth");
                })
        }*/
    }
})();