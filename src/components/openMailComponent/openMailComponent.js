(function () {
    angular.module("mainApp").component("openMailComponent", {
        templateUrl: "openMailComponent.html",
        controller: openMailController
    });

    function openMailController($stateParams, mailService, mailStorage, $state, $filter) {
        var ctrl = this;
        ctrl.currentPath = $state.current.name.slice(5);
        ctrl.currentPath = ctrl.currentPath.charAt(0).toUpperCase() + ctrl.currentPath.substr(1);
        ctrl.mailId = $stateParams.mailId;
        ctrl.$onInit = function () {
            if(localStorage.getItem("authToken")){
                return mailService.getOpenMail(ctrl.mailId)
                    .then (function (response) {
                        ctrl.email = new Email(response.data.response.id, response.data.response.subject, response.data.response.sender,
                            response.data.response.message, response.data.response.is_opened,
                            response.data.response.is_important, new Date(response.data.response.date), response.data.response.recipient);
                        mailService.getMailInbox(1, 1)
                            .then(function success(response) {
                                var emailsArr = $filter('emailFormat')(response.data.response.items);
                                mailStorage.setEmails(emailsArr, response.data.response.count_inbox, response.data.response.count_outbox, response.data.response.count_deleted,
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
        ctrl.getAllCheck = function () {
            mailService.deleteMail([ctrl.mailId])
                .then (function success(response) {
                    console.log(response);
                    $state.go("mail.inbox");
                }, function error() {
                });
        };
    }

})();