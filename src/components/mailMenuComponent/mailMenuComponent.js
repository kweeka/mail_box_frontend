(function () {
    angular.module("mainApp").component("mailMenuComponent",{
        templateUrl: "mailMenuComponent.html",
        controller: mailMenuController
    });

    function mailMenuController(mailStorage, mailService, $filter) {
        var ctrl = this;
        ctrl.mailStorage = mailStorage;
        if(!ctrl.mailStorage.countUnread && localStorage.getItem("authToken")){
            mailService.getMailInbox(1, 1)
                .then(function success(response) {
                    var emailsArr = $filter('emailFormat')(response.data.response.items);
                    mailStorage.setEmails(emailsArr, response.data.response.count_inbox, response.data.response.count_outbox, response.data.response.count_deleted,
                        response.data.response.count_unread);
                    return mailStorage.countUnread;
                }, function error() {
                    return null;
                });
        }
    }
})();