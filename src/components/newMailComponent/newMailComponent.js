(function () {
    angular.module("mainApp").component("newMailComponent", {
        templateUrl: "newMailComponent.html",
        controller: newMailController
    });

    function newMailController(mailService, $state, $stateParams) {
        var ctrl = this;
        ctrl.$onInit =function () {
            ctrl.recipient = ctrl.recipient || $stateParams.recipient;
            ctrl.subject = ctrl.subject || $stateParams.subject;
        };
        ctrl.sendMail = function () {
            if (ctrl.recipient === undefined || !ctrl.recipient.match(/\w+@\w+\.\w+/g)){
                ctrl.errorRecipient = "Not correct";
                return;
            }
            if (ctrl.subject === undefined){
                ctrl.errorSubject = "Not correct";
                return;
            }
            mailService.sendMail(ctrl.recipient, ctrl.subject, ctrl.text)
                .then (function (response) {
                    console.log(response);
                    $state.go("mail.inbox");
                }, function (response) {
                    console.log(response);
                })
        }
    }
})();
