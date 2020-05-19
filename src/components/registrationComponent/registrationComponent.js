(function () {
    angular.module("mainApp").component("registrationComponent", {
        templateUrl: "registrationComponent.html",
        controller: registrationController
    });

    function registrationController(authService, $state) {
        var ctrl = this;
        ctrl.registration = function () {
            if (ctrl.email === undefined || !ctrl.email.match(/\w+@\w+\.\w+/g)){
                ctrl.errorEmail = "Not correct";
                return;
            }
            if (ctrl.password === undefined || !ctrl.password.match(/\w{6,40}/g)){
                ctrl.errorPassword = "Not correct";
                return;
            }
                authService.registration(ctrl.email, ctrl.password, ctrl.userName)
                    .then(function success(response) {
                        console.log(response);
                        localStorage.setItem("authToken", response.data.response.token);
                        $state.go("mail.inbox");
                    }, function error(response) {
                        console.log(response);
                    })

        }
    }
})();