(function () {
    angular.module("mainApp").component("authorizationComponent",{
        templateUrl: "authorizationComponent.html",
        controller: authorizationController
    });

    function authorizationController(authService, $state) {
        var ctrl = this;
        ctrl.authorization = function () {
            if (ctrl.email === undefined || !ctrl.email.match(/\w+@\w+\.\w+/g)){
                ctrl.errorEmail = "Not correct";
                return;
            }
            if (ctrl.password === undefined || !ctrl.password.match(/\w{6,40}/g)){
                ctrl.errorPassword = "Not correct";
                return;
            }
            authService.auth(ctrl.email, ctrl.password, AuthTokenType.TEMPORARY)
                .then (function success(response) {
                    console.log(response);
                    localStorage.setItem("authToken", response.data.response.token);
                    $state.go("mail.inbox");
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