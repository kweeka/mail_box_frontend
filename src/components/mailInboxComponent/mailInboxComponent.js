(function () {
    angular.module("mainApp")
        .component("mailInboxComponent",{
            templateUrl: "mailInboxComponent.html",
            controller: mailInboxController,
            bindings: {
                emails: "=",
                page: "="
            }
        });

    function mailInboxController(mailService, $state, mailStorage, $timeout) {
        var ctrl = this;
        ctrl.$onInit = function () {
            $timeout(function () {
                ctrl.mailStorage = mailStorage;
            }, 15000);
            ctrl.allCount = mailStorage.getCountInbox();
            if(mailStorage.getEmails().length < mailStorage.getCountInbox()){
                ctrl.showMoreMobile= true;
            }
        };
        ctrl.arrCheck = [];
        ctrl.getAllCheck = function () {
            for(var y=0; y < ctrl.mailStorage.emails.length; y++){
                if(ctrl.mailStorage.emails[y].checked == true){
                    ctrl.arrCheck.push(ctrl.mailStorage.emails[y].id);
                }
            }
            mailService.deleteMail(ctrl.arrCheck)
                .then (function success(response) {
                    console.log(response);
                    $state.reload();
                }, function error(response) {
                    console.log(response);
                });
        };
    }
})();