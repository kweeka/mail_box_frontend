(function () {
    angular.module("mainApp").component("mailOutboxComponent", {
        templateUrl: "mailOutboxComponent.html",
        controller: mailOutboxController,
        bindings: {
            emails: "=",
            page: "="
        }
        });

    function mailOutboxController(mailStorage, mailService, $state) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.emails = mailStorage.getEmails();
            ctrl.countMailBox = mailStorage.getCountOutbox();
            if(mailStorage.getEmails().length < mailStorage.getCountOutbox()){
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