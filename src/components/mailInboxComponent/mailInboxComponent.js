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
                ctrl.emails = mailStorage.getEmails();
            }, 3000);
            ctrl.allCount = mailStorage.getCountInbox();
            if(mailStorage.getEmails().length < mailStorage.getCountInbox()){
                ctrl.showMoreMobile= true;
            }
        };
        ctrl.arrCheck = [];
        ctrl.getAllCheck = function () {
            for(var y=0; y < ctrl.emails.length; y++){
                if(ctrl.emails[y].checked == true){
                    ctrl.arrCheck.push(ctrl.emails[y].id);
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