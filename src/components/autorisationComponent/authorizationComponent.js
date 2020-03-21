(function () {
    angular.module("mainApp").component("authorizationComponent",{
        templateUrl: "authorizationComponent.html",
        controller: authorizationController,

    });

    function authorizationController(authService, $state, userService) {
        var ctrl = this;
        /*ctrl.$onInit = function() {
            if (localStorage.getItem("authToken")) {
                authService.getUserInfo()
                    .then(function success(response) {
                        userService.setUser(response.data.response.name, response.data.response.email, response.data.response.groups);
                        $state.go("mailInbox");
                    }, function error(response) {
                    })
            }
        };*/
        ctrl.authorization = function () {
            if (ctrl.email === undefined || !ctrl.email.match(/\w+@\w+\.\w+/g)){
                ctrl.errorEmail = "Not correct";
                return;
            }
            if (ctrl.password === undefined || !ctrl.password.match(/\d{6,40}/g)){
                ctrl.errorPassword = "Not correct";
                return;
            }
            authService.auth(ctrl.email, ctrl.password, AuthTokenType.TEMPORARY)
                .then (function success(response) {
                    console.log(response);
                    localStorage.setItem("authToken", response.data.response.token);
                    $state.go("mailInbox");
                }, function error(response) {
                    console.log(response);
                    if (response.data.response.field === "email"){
                        ctrl.errorEmail = response.data.response.message;
                    }
                    if (response.data.response.field === "password"){
                        ctrl.errorPassword = response.data.response.message;
                    }
                })
        }
    }
})();