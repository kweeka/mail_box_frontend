(function () {
    angular.module("mainApp").component("mailMenuComponent",{
        templateUrl: "mailMenuComponent.html",
        controller: mailMenuController
    });

    function mailMenuController(mailStorage, mailService) {
        var ctrl = this;
        ctrl.mailStorage = mailStorage;
        if(!ctrl.mailStorage.countUnread){
            mailService.getMailInbox(1, 1)
                .then(function success(response) {
                    mailStorage.setEmails(null, response.data.response.count_inbox, response.data.response.count_outbox, response.data.response.count_deleted,
                        response.data.response.count_unread);
                    return mailStorage.countUnread;
                }, function error() {
                    return null;
                });
        }
    }
})();