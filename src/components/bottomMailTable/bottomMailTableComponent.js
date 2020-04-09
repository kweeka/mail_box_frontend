(function () {
    angular.module("mainApp").component("bottomMailTableComponent", {
        templateUrl: "bottomMailTableComponent.html",
        controller: bottomMailTableController,
        bindings: {
            page: "<",
            emails: "=",
            qwe: "<"
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
        ctrl.$onInit = function () {
            ctrl.count = localStorage.getItem("pageMailCount");
            if(ctrl.count){
                ctrl.sele = ctrl.count;
            } else {
                ctrl.sele = 10;
            }
            ctrl.nextPageLimit = true;
            ctrl.earlyPageLimit = true;
            ctrl.firstMail = (ctrl.emails.length + ((ctrl.page-1) * ctrl.count - ctrl.emails.length + 1));
            ctrl.lastMail = ctrl.emails.length + ((ctrl.page-1) * ctrl.count);
            if (ctrl.page === 1 ) {
                ctrl.earlyPageLimit = false;
            }
            if (ctrl.lastMail == ctrl.qwe){
                ctrl.nextPageLimit = false;
            }
            /*
            if(ctrl.page === 1 ){
                if(localStorage.getItem("pageMailCount") == mailStorage.getCount()){
                    ctrl.nextPageLimit = false;
                }
                ctrl.firstMail = 1;
                ctrl.lastMail = localStorage.getItem("pageMailCount");
                ctrl.earlyPageLimit = false;
            } else if(localStorage.getItem("pageMailCount") * (ctrl.page) >= mailStorage.getCount()){
                ctrl.firstMail = localStorage.getItem("pageMailCount") * (ctrl.page - 1) + 1;
                ctrl.lastMail = mailStorage.getCount();
                ctrl.nextPageLimit = false;
            } else {
                ctrl.firstMail = localStorage.getItem("pageMailCount") * (ctrl.page - 1) + 1;
                ctrl.lastMail = localStorage.getItem("pageMailCount") * (ctrl.page);
            }
            */
        };

        ctrl.listMailPage = ['5', '10', '20', '50'];
    }
})();