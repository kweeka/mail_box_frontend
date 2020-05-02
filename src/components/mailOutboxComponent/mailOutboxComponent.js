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
            ctrl.mailStorage = mailStorage;
            ctrl.countMailBox = mailStorage.getCountOutbox();
            if(mailStorage.getEmails().length < mailStorage.getCountOutbox()){
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