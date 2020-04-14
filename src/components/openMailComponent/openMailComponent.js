(function () {
    angular.module("mainApp").component("openMailComponent", {
        templateUrl: "openMailComponent.html",
        controller: openMailController
    });

    function openMailController($stateParams, mailService, mailStorage) {
        var ctrl = this;
        ctrl.mailId = $stateParams.mailId;
        ctrl.$onInit = function () {
            if(localStorage.getItem("authToken")){
                return mailService.getOpenMail(ctrl.mailId)
                    .then (function (response) {
                        console.log(response);
                        ctrl.email = new Email(response.data.response.id, response.data.response.subject, response.data.response.sender,
                            response.data.response.message, response.data.response.read, new Date(response.data.response.date));
                        mailService.getMailInbox(1, 1)
                            .then(function success(response) {
                                mailStorage.setEmails(null, response.data.response.count_inbox, response.data.response.count_outbox, response.data.response.count_deleted,
                                    response.data.response.count_unread);
                                return null;
                            }, function error() {
                                return null;
                            });
                    }, function (response) {
                        console.log(response);
                    })
            }
        };
    }
})();