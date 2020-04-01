(function () {
    angular.module("mainApp").component("bottomMailTableComponent", {
        templateUrl: "bottomMailTableComponent.html",
        controller: bottomMailTableController,
        bindings: {
            page: "<"
        }
    });

    function bottomMailTableController($state, mailStorage) {
        var ctrl = this;
        ctrl.getMailValMails = function () {
            localStorage.setItem("pageMailCount", ctrl.sele);
            $state.reload();
        };
        ctrl.transition = function () {
            $state.go("mail.inbox", {page: ctrl.page});
        };
        ctrl.getCount = function () {
            return mailStorage.getCount();
        };
        ctrl.$onInit = function () {
            if(localStorage.getItem("pageMailCount")){
                ctrl.sele = localStorage.getItem("pageMailCount");
            } else {
                ctrl.sele = 10;
            }
            ctrl.nextPageLimit = true;
            ctrl.earlyPageLimit = true;
            if(ctrl.page === 1 ){
                ctrl.firstMail = 1;
                ctrl.lastMail = localStorage.getItem("pageMailCount");
                ctrl.earlyPageLimit = false;
            } else if(localStorage.getItem("pageMailCount") * (ctrl.page) > mailStorage.getCount()){
                ctrl.firstMail = localStorage.getItem("pageMailCount") * (ctrl.page - 1) + 1;
                ctrl.lastMail = mailStorage.getCount();
                ctrl.nextPageLimit = false;
            } else {
                ctrl.firstMail = localStorage.getItem("pageMailCount") * (ctrl.page - 1) + 1;
                ctrl.lastMail = localStorage.getItem("pageMailCount") * (ctrl.page);
            }
        };
        ctrl.listMailPage = ['5', '10', '20', '50'];
    }
})();