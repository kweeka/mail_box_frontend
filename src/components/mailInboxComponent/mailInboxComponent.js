(function () {
    angular.module("mainApp")
        .component("mailInboxComponent",{
            templateUrl: "mailInboxComponent.html",
            controller: mailInboxController,
            bindings: {
                emails: "="
            }
        });

    function mailInboxController(mailService, $state) {
        var ctrl = this;
        ctrl.arrCheck = [];
        ctrl.getAllCheck = function () {
            for(var y=0; y < ctrl.emails.length; y++){
                if(ctrl.emails[y].checked == true){
                    ctrl.arrCheck.push(ctrl.emails[y].id);
                }
            }
            mailService.deleteMailInbox(ctrl.arrCheck)
                .then (function success(response) {
                    console.log(response);
                    $state.reload();
                }, function error(response) {
                    console.log(response);
                });
        }
    }
})();