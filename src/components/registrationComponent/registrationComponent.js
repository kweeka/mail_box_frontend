(function () {
    angular.module("mainApp").component("registrationComponent", {
        templateUrl: "registrationComponent.html",
        controller: registrationController
    });

    function registrationController(authService, $state, userService) {
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
        ctrl.registration = function () {
            if (ctrl.email === undefined || !ctrl.email.match(/\w+@\w+\.\w+/g)){
                ctrl.errorEmail = "Not correct";
                return;
            }
            if (ctrl.password === undefined || !ctrl.password.match(/\d{6,40}/g)){
                ctrl.errorPassword = "Not correct";
                return;
            }
                authService.registration(ctrl.email, ctrl.password, ctrl.userName)
                    .then(function success(response) {
                        console.log(response);
                        localStorage.setItem("authToken", response.data.response.token);
                        $state.go("mailInbox");
                    }, function error(response) {
                        console.log(response);
                    })

        }
    }
})();